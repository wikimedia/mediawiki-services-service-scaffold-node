'use strict';

const sUtil = require('@wikimedia/servicelib-node-utils/util')
const examples = require('@wikimedia/servicelib-node-examples')

module.exports = (app) => {
    if (!app.conf.load_examples) {
        // disable in production
        return undefined;
    }

    const router = sUtil.router();

    // See api examples under @wikimedia/servicelib-node-examples
    examples.registerApiRoutes( router, app );

    /*
     * With api_version, it makes the routes show up under /:domain/:api_version/.
     * With skip_domain, the path would be / and api_version would be ignored.
     */
    return {
        path: '/',
        api_version: 1,
        router
    };

};
