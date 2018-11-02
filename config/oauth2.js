var oauth2orize         = require('oauth2orize'),
    passport            = require('passport'),
    login               = require('connect-ensure-login'),
    bcrypt              = require('bcryptjs'),
    trustedClientPolicy = require('../api/policies/isTrustedClient.js');
    var flash = require('connect-flash');
// Create OAuth 2.0 server
var server = oauth2orize.createServer();

server.serializeClient(function(client, done) {
  return done(null, client.id);
});

server.deserializeClient(function(id, done) {
Client.findOne(id, function(err, client) {
  if (err) { return done(err); }
    return done(null, client);
  });
});

// Generate authorization code
server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
  console.log('server.grant(oauth2orize.grant.code(function(client',client,redirectURI,user,ares);
  Authcode.create({
                    clientId: client.clientId,
                    redirectURI: redirectURI,
                    userId: user.tlid,
                    scope: ares.scope
                  }).exec(function(err,code){
                    if(err){return done(err,null);}
                    return done(null,code.code);
                  });
}));

// Generate access token for Implicit flow
// Only access token is generated in this flow, no refresh token is issued
server.grant(oauth2orize.grant.token(function(client, user, ares, done) {
  console.log('Generate access token for Implicit flow');
  AccessToken.destroy({ userId: user.id, clientId: client.clientId }, function (err) {
    if (err){
      return done(err);
    } else {
      AccessToken.create({ userId: user.id, clientId: client.clientId }, function(err, accessToken){
        if(err) {
          return done(err);
        } else {
          return done(null, accessToken.token);
        }
      });
    }
  });
}));

// Exchange authorization code for access token
//get tocken from oauth server
server.exchange(oauth2orize.exchange.code(function(client, code, redirectURI,scope, done) {
  console.log('Exchange authorization code for access token line 56 scope ');
  console.log(scope);
  Authcode.findOne({
                     code: code
                   }).exec(function(err,code){
                     console.log('  }).exec(function(err,code){ ');
                     console.log(code);
                     if(err || !code) {
                       return done(err);
                     }
                     if (client.clientId !== code.clientId) {
                       return done(null, false);
                     }
                     if (redirectURI !== code.redirectURI) {
                       return done(null, false);
                     }

                     // Remove Refresh and Access tokens and create new ones
                     RefreshToken.destroy({ userId: code.userId, clientId: code.clientId }, function (err) {
                       if (err) {
                         return done(err);
                       } else {
                         AccessToken.destroy({ userId: code.userId, clientId: code.clientId }, function (err) {
                           if (err){
                             return done(err);
                           } else {
                             RefreshToken.create({ userId: code.userId, clientId: code.clientId }, function(err, refreshToken){
                               if(err){
                                 return done(err);
                               } else {
                                 //add scope to accessToken
                                 AccessToken.create({ userId: code.userId, clientId: code.clientId,scope:code.scope }, function(err, accessToken){
                                   if(err) {
                                     return done(err);
                                   } else {
                                     return done(null, accessToken.token, refreshToken.token, { 'expires_in': sails.config.oauth.tokenLife });
                                   }
                                 });
                               }
                             });
                           }
                         });
                       }
                     });

                   });
}));

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
  console.log('// Exchange username & password for access token.');
    User.findOne({ email: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        var pwdCompare = bcrypt.compareSync(password, user.hashedPassword);
        if(!pwdCompare){ return done( null, false); };

        // Remove Refresh and Access tokens and create new ones
        RefreshToken.destroy({ userId: user.id, clientId: client.clientId }, function (err) {
            if (err) {
              return done(err);
            } else {
              AccessToken.destroy({ userId: user.id, clientId: client.clientId }, function (err) {
                if (err){
                  return done(err);
                } else {
                  RefreshToken.create({ userId: user.id, clientId: client.clientId }, function(err, refreshToken){
                    if(err){
                      return done(err);
                    } else {
                      AccessToken.create({ userId: user.id, clientId: client.clientId }, function(err, accessToken){
                        if(err) {
                          return done(err);
                        } else {
                          done(null, accessToken.token, refreshToken.token, { 'expires_in': sails.config.oauth.tokenLife });
                        }
                      });
                    }
                  });
                }
              });
            }
        });
    });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    console.log('Exchange refreshToken for access token. line 56 scope ' );
    console.log(scope);
    RefreshToken.findOne({ token: refreshToken }, function(err, token) {

        if (err) { return done(err); }
        if (!token) { return done(null, false); }
        if (!token) { return done(null, false); }

        User.findOne({id: token.userId}, function(err, user) {

            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            // Remove Refresh and Access tokens and create new ones
            RefreshToken.destroy({ userId: user.id, clientId: client.clientId }, function (err) {
              if (err) {
                return done(err);
              } else {
                AccessToken.destroy({ userId: user.id, clientId: client.clientId }, function (err) {
                  if (err){
                    return done(err);
                  } else {
                    RefreshToken.create({ userId: user.id, clientId: client.clientId }, function(err, refreshToken){
                      if(err){
                        return done(err);
                      } else {
                        AccessToken.create({ userId: user.id, clientId: client.clientId }, function(err, accessToken){
                          if(err) {
                            return done(err);
                          } else {
                            done(null, accessToken.token, refreshToken.token, { 'expires_in': sails.config.oauth.tokenLife });
                          }
                        });
                      }
                    });
                  }
                });
              }
           });
        });
    });
}));

module.exports = {
 http: {
    customMiddleware: function(app){

      // Initialize passport
      app.use(passport.initialize());
      app.use(passport.session());
     // app.use(flash());
      /***** OAuth authorize endPoints *****/

      app.get('/oauth/authorize',
        login.ensureLoggedIn(),
        server.authorize(function(clientId, redirectURI, done) {

          Client.findOne({clientId: clientId}, function(err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.redirectURI != redirectURI) { return done(null, false); }
            return done(null, client, client.redirectURI);
          });
        }),
        function(req, res, next){

            // TRUSTED CLIENT
            // if client is trusted, skip ahead to next,
            // which is the server.decision() function
            // that normally is called when you post the auth dialog form
            if (req.oauth2.client.trusted) {

                // add needed params to simulate auth dialog being posted
                req.trusted = true;
                req.body = req.query;
                req.body.transaction_id = req.oauth2.transactionID;
                return next();

            }
            var scopeMap = {
          		// ... display strings for all scope variables ...
          		view_account: 'view your account',
          		edit_account: 'view and edit your account',
          	};

            return res.render('test', {
                transactionID: req.oauth2.transactionID,
                user: req.user,
                scope: req.oauth2.req.scope,
                client: req.oauth2.client,
                jwtToken: req.query.token,
                map: scopeMap
            });

        },
        // We added this 2 methods here in case the form is skipped (TRUSTED CLIENT)
        server.decision(),
        server.errorHandler()
      );
      app.get('/login',function(req,res){
        return res.render('login',{message:''})
      })
      app.get('/oauth/logout',function(req,res){
        console.log('logout success');
          var cookie = req.cookies;
          for (var prop in cookie) {
              if (!cookie.hasOwnProperty(prop)) {
                  continue;
              }    
              req.res.cookie(prop, '', {expires: new Date(0)});
          }
          req.session.destroy();
          return res.redirect('http://localhost:1339/login');
      })
     //login is cheked in LocalStrategy in config/passport
     // app.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login',failureFlash: true }));
     app.post('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user,info) {
        if (err) {
          return next(err); // will generate a 500 error
        }
        console.log('buggg post/login')
       console.log(err);
       console.log(info)
        // Generate a JSON response reflecting authentication status
        if (! user) {
          
          return res.render('login',{ success : false, message : info.message });
        }
        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        req.login(user, loginErr => {
          if (loginErr) {
            return next(loginErr);
          }
        
            var url = '/';
            console.log(req.session);
            if (req.session && req.session.returnTo) {
              
              url = req.session.returnTo;
              delete req.session.returnTo;
            }
            return res.redirect(url);
          
        });      
      })(req, res, next);
    });
      app.post('/oauth/authorize/decision',
        login.ensureLoggedIn(),
      //  server.decision());
      //callback code for client

         server.decision(function(req,done){
           console.log('   server.decision(function(req,done){ config/oauth2 line 254 ');
           console.log(req.oauth2.req);
           if (req.body['cancel']){
             //clear all cookie
             var cookie = req.cookies;
             for (var prop in cookie) {
                 if (!cookie.hasOwnProperty(prop)) {
                     continue;
                 }    
                 req.res.cookie(prop, '', {expires: new Date(0)});
             }
             req.session.destroy();
            }
           done(null, { scope: req.oauth2.req.scope });
         }));
      /***** OAuth token endPoint *****/

      app.post('/oauth/token',
        trustedClientPolicy,
        passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
        server.token(),
        server.errorHandler()
      );

    }
 }
};
