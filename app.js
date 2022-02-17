'use strict';

const express = require('express');
const init = require('@wikimedia/servicelib-node-init');
const packageInfo = require('./package.json');

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
    return init.initApp(options, packageInfo)
    .then((app) => {
        // Load dynamic route handlers from the routes directory.
        init.loadRoutes(app, `${__dirname}/routes`);
        return app;
      })
    .then((app) => {
        // Define routes for static files.
        // Per default, we only serve the robots.txt file from static/robots.txt.
        app.use('/robots.txt', express.static(`${__dirname}/static/robots.txt`));

        // To also server all files from the static directory, use:
        //   app.use('/static', express.static(`${__dirname}/static`));

        return app;
    }).then(init.createServer);
};
