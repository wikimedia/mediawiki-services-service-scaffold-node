'use strict';

const sUtil = require('@wikimedia/servicelib-node-utils/util')
const routes = require('@wikimedia/servicelib-node-utils/routes');

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
    res.type('text/plain').end('User-agent: *\nDisallow: /\n');
});

module.exports = (appObj) => {

    app = appObj;

    router.get('/', routes.getSpecRouteHandler( app.conf.spec ) );
    router.get('/', routes.getSwaggerUiRouteHandler( app ) );
    router.get('/healthz', routes.getHealthZRouteHandler( app, () => 'pass' ) );

    return {
        path: '/',
        skip_domain: true,
        router
    };

};
