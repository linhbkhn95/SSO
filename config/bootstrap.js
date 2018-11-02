/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {


  //  MSQ.subtest('ex_Authorize','queue_Authorize');
  // MSQ.subscriber('ex_Authorize', 'queue_Authorize', function (message) {
  //   sails.log.info(message);
  //   sails.log.info('callback1');
  //   //     Authorize.create(message,function Authorize(err,au){
  //   //      if(err){
  //   //
  //   //       // res.send(401,"lỗi thêm authorize");
  //   //        sails.log.info(err);
  //   //       //return  res.send(err)
  //   //      }
  //   // //     res.send("ok");
  //   //
  //   //    });
  // })

  // MSQ.subscriber('ex_Authorize', 'queue1_Authorize', function (message) {
  //   sails.log.info(message);
  //   sails.log.info('callback2');
  //   //     Authorize.create(message,function Authorize(err,au){
  //   //      if(err){
  //   //
  //   //       // res.send(401,"lỗi thêm authorize");
  //   //        sails.log.info(err);
  //   //       //return  res.send(err)
  //   //      }
  //   // //     res.send("ok");
  //   //
  //   //    });
  // })
  User.findOne({ email: 'ctyqlq@gmail.com' }, function (err, user) {
    if (!user) {
      User.create({
        email: 'ctyqlq@gmail.com',
        password: 'password',
      }).exec(function (err, user) {
        sails.log.info("Default user created");
        sails.log.info("- username: " + user.email);
        sails.log.info("- password: password");
      });
    } else {
      sails.log.info('Default user already exists');
      sails.log.info("- username: " + user.email);
      sails.log.info("- password: password");
    }
  });

  User.findOne({ email: 'dlpp@gmail.com' }, function (err, user) {
    if (!user) {
      User.create({
        email: 'dlpp@gmail.com',
        password: 'password',
      }).exec(function (err, user) {
        sails.log.info("Default user created");
        sails.log.info("- username: " + user.email);
        sails.log.info("- password: password");
      });
    } else {
      sails.log.info('Default user already exists');
      sails.log.info("- username: " + user.email);
      sails.log.info("- password: password");
    }
  });


  User.findOne({ email: 'nhgs@gmail.com' }, function (err, user) {
    if (!user) {
      User.create({
        email: 'nhgs@gmail.com',
        password: 'password',
      }).exec(function (err, user) {
        sails.log.info("Default user created");
        sails.log.info("- username: " + user.email);
        sails.log.info("- password: password");
      });
    } else {
      sails.log.info('Default user already exists');
      sails.log.info("- username: " + user.email);
      sails.log.info("- password: password");
    }
  });
  var allClient = [{ name: 'trustedTestClient', redirectURI: 'http://192.168.1.93:1338/auth/allow' },
  { name: 'Fundserv', redirectURI: 'http://192.168.1.93:1339/auth/allow' },
  { name: 'FundServDemo', redirectURI: 'http://vsd.fss.com.vn:1339/auth/allow' },
  { name: 'FundservDev', redirectURI: 'http://localhost:1339/auth/allow' },
  { name: 'FundservDev1', redirectURI: 'http://192.168.40.22:1335/auth/allow' },
  { name: 'FundservDev2', redirectURI: 'http://192.168.40.22:1335/auth/allow' }];
  allClient.forEach(element => {
    // Create a trusted application
    Client.findOne({ 'name': element.name }, function (err, client) {
      if (err) {
        sails.log.info(err.message);
      } else {
        if (!client) {
          Client.create({
            name: element.name,
            redirectURI: element.redirectURI,
            trusted: false
          }).exec(function (err, client) {
            if (err) {
              sails.log.info(err.message);
            } else {
              sails.log.info(element.name + " created");
              sails.log.info("- client_id: " + client.clientId);
              sails.log.info("- client_secret: " + client.clientSecret);
              sails.log.info("- redirectURI: " + client.redirectURI);
            }
          });
        } else {
          sails.log.info(element.name + ' already exists');
          sails.log.info("- client_id: " + client.clientId);
          sails.log.info("- client_secret: " + client.clientSecret);
          sails.log.info("- redirectURI: " + client.redirectURI);
        }
      }
    });
  });
  cb();
};
