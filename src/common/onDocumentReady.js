export default (callback) => {
    if (document.addEventListener !== undefined) {
        document.addEventListener('DOMContentLoaded', callback);
        return;
    }
    window.onload(callback);
};
