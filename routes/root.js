'use strict';

const sUtil = require('@wikimedia/servicelib-node-utils/util')
const routes = require('@wikimedia/servicelib-node-utils/routes');

module.exports = (app) => {
    const router = sUtil.router();

    // Expose the swagger UI self-documentation at "/".
    // The swagger UI will only be sent if the client accepts a text/html
    // response, or the "doc" parameter is sent. You can set the second
    // parameter (asDefault) to false in order to only expose the documentation
    // at "/?doc", so other content can be served from plain "/".
    router.get('/', routes.getSwaggerUiRouteHandler( app ) );

    // Expose the swagger spec at "/?spec"
    router.get('/', routes.getSpecRouteHandler( app.conf.spec ) );

    // Expose service health at "/healthz".
    // See <https://kubernetes.io/docs/reference/using-api/health-checks/>
    router.get('/healthz', routes.getHealthZRouteHandler( app, () => 'pass' ) );

    return {
        path: '/',
        skip_domain: true,
        router
    };

};
