const {withMaterialDesign} = require('../common');

withMaterialDesign(() => {
    const socket = io(window.location.origin);

    const urlInputField = document.getElementById('url-input-field');
    const urlUpdateButton = document.getElementById('url-update-button');
    const urlResetButton = document.getElementById('url-reset-button');

    urlUpdateButton.addEventListener('click', () => socket.emit('change', {
        url: urlInputField.value,
    }));
    urlResetButton.addEventListener('click', () => socket.emit('reset'));
});
