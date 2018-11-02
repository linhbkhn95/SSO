/**
 * oauthBearer policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var passport = require('passport');

module.exports = function (scope) {
				console.log('vào daay roi');
				console.log(scope);
      return  function(req, res, next) {
					     console.log('headers is req');
				       console.log(req.headers);
				   	passport.authenticate(
					    'bearer',
					    function(err, user, info)
					    {
					        if ((err) || (!user))
					        {
					            res.send(401);
					            // res.redirect('/');
					            return;
					        }
									console.log('oauthBearer:line 25 :');
									console.log(myArg);
									console.log(info);
									if(info.scope===myArg)
									   console.log('okkkkk');
				            delete req.query.access_token;
					        req.user = user;
									req.scope = info;
					        return next();
					    }
					)(req, res);
}
};
