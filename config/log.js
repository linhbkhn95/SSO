/**
 * Logger configuration
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which 
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#documentation
 */

var winston = require('winston');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
var Mail = require('winston-mail').Mail;
// require('winston-email');
// require('winston-mongodb').MongoDB
// require('winston-logstash');
// winston.add(winston.transports.Logstash, {
//   port: 28777,
//   node_name: 'my node name',
//   host: '127.0.0.1'
// });
var logDir = 'log'; // directory path you want to set
var fs = require( 'fs' );
if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logDir );
}
const moment = require('moment');
const TIMESTAMP_FORMAT='YYYY-MM-DD HH:mm:ss.SSS';
var logger = new (winston.Logger)({
   transports: [
    new(winston.transports.DailyRotateFile)({
        filename: '.common.log',
        dirname: logDir,
        datePattern: 'yyyyMMdd',
        prepend: true,
        level: process.env.ENV === 'development' ? 'debug' : 'info',
        timestamp: () => {
            return moment().format(TIMESTAMP_FORMAT);
          },
        json: false
    }),
    new(winston.transports.DailyRotateFile)({
        filename: '.errors.log',
        dirname: logDir,
        name:'error-file',// đặt tên cho loại log vì có 2 log ra file , 
        datePattern: 'yyyyMMdd',
        prepend: true,
        level:'error', // loại log dc log ra file
        timestamp: () => {
            return moment().format(TIMESTAMP_FORMAT);
          },
        json: false
    })
      ]
   });
logger.add(winston.transports.Console, {
  level: 'silly',
  colorize: true
});


// logger.add(winston.transports.File, {
//   level: 'info', //loại log được cần in ra file
//   filename: 'logs.log',
//   json: true
// });
// logger.add(winston.transports.File,{
//   level:'error',
//   filename:'logs_error.log'
// })

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  custom: logger,
  level: 'verbose',


  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false // khong hien thi thoi gian xu ly dang ms giay trong log
};
