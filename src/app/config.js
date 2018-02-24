let config = {
    show: false,
    width: 800,
    height: 600,
    backgroundColor: '#6200ee',
    env: process.env.NODE_ENV,
    debug: false,
};

switch (config.env) {
    case 'development':
    case 'debug':
        Object.assign(config, {
            debug: 'debug' === config.env,
        });
        break;
    default:
        Object.assign(config, {
            fullscreenable: true,
            fullscreen: true,
        });
}

module.exports = config;
