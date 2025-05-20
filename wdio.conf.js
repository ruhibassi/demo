const path = require('path');
const os = require('os');
const fs = require('fs');

exports.config = {
    runner: 'local',

    specs: [
        './test/spec/**/*.js'
    ],
    exclude: [],

    maxInstances: 10,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-infobars',
                '--disable-dev-shm-usage',
                '--no-sandbox'
                // We'll dynamically add --user-data-dir in beforeSession
            ],
            prefs: {
                'profile.password_manager_leak_detection': false
            }
        },
        webSocketUrl: true,
        unhandledPromptBehavior: 'ignore'
    }],

    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://blazedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    /**
     * Hook to dynamically assign a unique Chrome profile dir per session
     */
    beforeSession: function (config, capabilities, specs, cid) {
        const uniqueDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-profile-'));
        capabilities['goog:chromeOptions'].args.unshift(`--user-data-dir=${uniqueDir}`);
    }
};
