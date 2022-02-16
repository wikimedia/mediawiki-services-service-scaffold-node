'use strict';

const sUtil = require('@wikimedia/servicelib-node-utils/util')
const routes = require('@wikimedia/servicelib-node-utils/routes');

module.exports = (app) => {
    const router = sUtil.router();

    router.get('/', routes.getSpecRouteHandler( app.conf.spec ) );
    router.get('/', routes.getSwaggerUiRouteHandler( app ) );
    router.get('/healthz', routes.getHealthZRouteHandler( app, () => 'pass' ) );

    return {
        path: '/',
        skip_domain: true,
        router
    };

};
