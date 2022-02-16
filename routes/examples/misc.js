'use strict';

const sUtil = require('@wikimedia/servicelib-node-utils/util')
const examples = require('@wikimedia/servicelib-node-examples')

module.exports = (app) => {
    if (!app.conf.load_examples) {
        // disable in production
        return undefined;
    }

    const router = sUtil.router();

    // See miscellany examples under @wikimedia/servicelib-node-examples
    examples.registerMiscRoutes( router, app );

    /*
     * With skip_domain, it makes the routes show up directly under /ex.
     * Without skip_domain, the path would be /:domain/:api_version/ex.
     */
    return {
        path: '/ex',
        skip_domain: true,
        router
    };

};
