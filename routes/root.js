'use strict';

const sUtil = require('@wikimedia/servicelib-node-utils/util')
const swaggerUi = require('@wikimedia/servicelib-node-utils/swagger-ui');

/**
 * The main router object
 */
const router = sUtil.router();

/**
 * The main application object reported when this module is require()d
 */
let app;

/**
 * GET /robots.txt
 * Instructs robots no indexing should occur on this domain.
 */
router.get('/robots.txt', (req, res, next) => {

    next();
    res.type('text/plain').end('User-agent: *\nDisallow: /\n');
});

/**
 * GET /
 * Main entry point. Currently it only responds if the spec or doc query
 * parameter is given, otherwise lets the next middleware handle it
 */
router.get('/', (req, res, next) => {
    if ({}.hasOwnProperty.call(req.query || {}, 'spec')) {
        res.json(app.conf.spec);
    } else if ({}.hasOwnProperty.call(req.query || {}, 'doc')) {
        return swaggerUi.processRequest(app, req, res);
    } else {
        next();
    }

});

module.exports = (appObj) => {

    app = appObj;

    return {
        path: '/',
        skip_domain: true,
        router
    };

};
