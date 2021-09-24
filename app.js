'use strict';

const express = require('express');
const init = require('servicelib-node/init');

/**
 * The service's entry point. It takes over the configuration
 * options and the logger- and metrics-reporting objects from
 * service-runner and starts an HTTP server, attaching the application
 * object to it.
 *
 * @param {Object} options the options to initialise the app with
 * @return {bluebird} HTTP server
 */
module.exports = (options) => {
    return init.initApp(options)
    .then((app) => init.loadRoutes(app, `${__dirname}/routes`))
    .then((app) => {
        // serve static files from static/
        app.use('/static', express.static(`${__dirname}/static`));
        return app;
    }).then(init.createServer);
};
