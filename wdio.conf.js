const path = require('path');
const os = require('os');
const fs = require('fs');

exports.config = {
    runner: 'local',

    specs: ['./test/spec/**/*.js'],
    exclude: [],
    maxInstances: 1,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--headless=new',              // ✅ NEW headless mode
                '--disable-gpu',
                '--disable-infobars',
                '--disable-dev-shm-usage',
                '--no-sandbox'
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
     * ✅ Assign unique temp folder for each run
     */
    beforeSession: function (config, capabilities, specs, cid) {
        const fallbackDir = path.join(__dirname, `tmp_profile_${cid}`);
        try {
            const uniqueDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-profile-'));
            capabilities['goog:chromeOptions'].args.unshift(`--user-data-dir=${uniqueDir}`);
        } catch (err) {
            console.warn('⚠ Failed to create tmp folder, using fallback:', fallbackDir);
            fs.mkdirSync(fallbackDir, { recursive: true });
            capabilities['goog:chromeOptions'].args.unshift(`--user-data-dir=${fallbackDir}`);
        }
    }
};
