import onDocumentReady from './onDocumentReady';

export default (callback) => onDocumentReady(() => {
    callback();
    mdc.autoInit();
});
