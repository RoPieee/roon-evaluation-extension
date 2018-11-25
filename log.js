// vim:ft=javascript:ts=3:sw=3:sts=3:et
"use strict";

const winston = require('winston');
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [
    //
    //new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
    new winston.transports.Console({})
  ]
});

logger.level = process.env.NODE_DEBUG || 'debug';
module.exports = logger;
