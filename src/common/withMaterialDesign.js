const onDocumentReady = require('./onDocumentReady');

module.exports = (callback) => onDocumentReady(() => {
    callback();
    mdc.autoInit();
});
