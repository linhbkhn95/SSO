// var amqp = require('amqp');

// var rabbitmq_cfg = require('../../config/env.js');
// // var open = require('amqplib').connect('amqp://localhost:15672/');
// var rabbit = amqp.createConnection({ host: rabbitmq_cfg.RABBITMQ_HOST, port: rabbitmq_cfg.RABBITMQ_PORT });
// rabbit.on('error', function (e) {
//   sails.log.error("Error from amqp: ", e);
// });
// module.exports = {

//   // ham nay dang ki nhan message theo kieu exchange la topic
//   'subtest': function subtest(exchange, queue) {

//     var rabbit = amqp.createConnection();
//     rabbit.on('ready', function () {

//       rabbit.exchange(exchange, { autoDelete: false }, function (ex) {
//         rabbit.queue(queue, { autoDelete: false }, function (q) {
//           q.bind(exchange, queue);
//           sails.log.info('lam viec');

//           q.subscribe(function (message, headers, deliveryInfo, messageObject) {
//             //setTimeout(function(){
//             sails.log.info("vào đây sssss");
//             Authorize.create(message, function Authorize(err, au) {
//               if (err) {

//                 // res.send(401,"lỗi thêm authorize");
//                 sails.log.info(err);
//                 //return  res.send(err)
//               }
//               //     res.send("ok");

//             });
//             sails.log.info(message);
//             //sails.log.info( JSON.parse(message));
//             sails.log.info(headers);
//             sails.log.info(deliveryInfo);
//             ex.publish(deliveryInfo.replyTo, { message: 'done' }, { headers: headers });
//             //  }, 1500);
//           });
//         });
//       });
//     });


//   },
//   //ham nay phuc vu cho viec dang ki de nhan message theo kieu broadcast message trong rabbitmq
//   'subscriber': function subscriber(exchangename, queuename, cb) {

//     var connection = amqp.createConnection({ host: rabbitmq_cfg.RABBITMQ_HOST, port: rabbitmq_cfg.RABBITMQ_PORT });
//     connection.on('ready', function () {

//       connection.exchange(exchangename, options = { type: 'fanout' }, function (exchange) {

//         //  sails.log.info('vao ham 1');
//         // c.queue(queue, function(q){
//         //   q.bind(exchange, '');
//         //   sails.log.info('lam viec');
//         //
//         //   q.subscribe(function(message, headers, deliveryInfo, messageObject){
//         //     //setTimeout(function(){
//         //       sails.log.info("vào đây sssss");
//         //       cb(message);
//         //   //    sails.log.info(message);
//         //
//         //
//         //   });
//         // });
//         connection.queue(queuename, function (queue) {
//           sails.log.info('Created queue ' + queuename)
//           queue.bind(exchange, '');
//           queue.subscribe(function (message) {
//             sails.log.info('subscribed to ' + queuename)
//             // var encoded_payload = unescape(message.data)
//             // var payload = JSON.parse(encoded_payload)
//             sails.log.info('Recieved a message:' + queue)
//             cb(message)
//           })
//         })
//       });
//     });


//   }
// }
// // add this for better debuging


// // Wait for connection to become established.
