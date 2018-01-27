import os from 'os';
import {isAddressLocal, isAddressRoutable} from './index';

const isAddressLocalRoute = (a) => isAddressLocal(a) && isAddressRoutable(a);

export default () => Object.values(os.networkInterfaces()).
    reduce((result, addrs) => result.
        concat(addrs.filter(isAddressLocalRoute).map((a) => a.address)), []);
