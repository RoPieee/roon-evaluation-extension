// vim:ft=javascript:ts=3:sw=3:sts=3:et
"use strict";

// take care of logging
var logger = require('./log.js');

var os     = require('os');
var _      = require('lodash');
//var mqtt   = require('./mqtt.js');
//var notify = require('sd-notify');

// Roon objects
var core;
var transport;

// My objects
var MyZones   = new Map();
var MqttCache = new Map();
var idleTimerId;
var liveCounter = 0;
var displayIdle = false;

// LET'S GO!

var RoonApi          = require("node-roon-api"),
    RoonApiStatus    = require("node-roon-api-status"),
    RoonApiTransport = require("node-roon-api-transport");

var roon = new RoonApi({
    extension_id:        'org.ropieee.evaluate',
    display_name:        "RoPieee Evaluation Extension [" + os.hostname() + "]",
    display_version:     "0.0.1",
    publisher:           'Spockfish',
    email:               'htenberge+ropieee@gmail.com',
    website:             'https://ropieee.org',
    log_level:           'debug',

    core_paired: function(_core) {
       logger.info("CORE PAIRED: " + _core.core_id + ", aka: " + _core.display_name);
	    core = _core;
       transport = core.services.RoonApiTransport;
       transport.subscribe_zones(cb_subscribe_zones);

       var _coreURL = core.moo.transport.ws.url.slice(5);
    },

    core_unpaired: function(_core) {
       logger.info("CORE UNPAIRED")
       core = undefined;
       transport = undefined;
       MyZones.clear();

       // let's exit so systemd can restart
       process.exit(1);
    }
});

var svc_status = new RoonApiStatus(roon);

roon.init_services({
    required_services: [ RoonApiTransport ],
    provided_services: [ svc_status ],
});

svc_status.set_status("Running", false);

// systemd stuff
//notify.ready();
//notify.startWatchdogMode(2800);

// Roon API watchdog
setInterval(ping_roon, 60000);

logger.info("We're set. Start discovering Roon instances...");
roon.start_discovery();

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// callback function for 'subscribe_zones' call

function cb_subscribe_zones(cmd, data) {
   if (core === undefined) return;

   // so, what happened?
   if (cmd == "Changed") {
      logger.debug("cb_subscribe_zones() CHANGED: " + JSON.stringify(data, null, '  '));

      return;
   }

   if (cmd == "Subscribed") {
      logger.debug("cb_subscribe_zones() SUBSCRIBED: " + JSON.stringify(data, null, '  '));

      setTimeout(get_detailed_info, 1000);

      return;

   }

   logger.warn("cb_subscribe_zones() unhandled cmd:" + cmd);
}

// -----------------------------------------------------------------------------
// callback function for 'get_zones' call

function cb_get_zones(cmd, data) {
   if (core === undefined) return;

   logger.debug("cb_get_zones() " + JSON.stringify(data, null, '  '));
}

// -----------------------------------------------------------------------------
// get detailed information on all discovered zones

function get_detailed_info() {
   logger.info("get_detailed_info()");
   transport.get_zones(cb_get_zones);
}

// -----------------------------------------------------------------------------
//

function ping_roon() {

   ++liveCounter;
   logger.debug('ping_roon() timeout ' + liveCounter);

   svc_status.set_status("Running (" + liveCounter + ")", false);
}
