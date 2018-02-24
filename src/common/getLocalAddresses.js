const os = require('os');
const isAddressLocal = require('./isAddressLocal');
const isAddressRoutable = require('./isAddressRoutable');

const isAddressLocalRoute = (a) => isAddressLocal(a) && isAddressRoutable(a);

module.exports = () => Object.values(os.networkInterfaces()).
    reduce((result, addrs) => result.
        concat(addrs.filter(isAddressLocalRoute).map((a) => a.address)), []);
