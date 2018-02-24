const chai = require('chai');
const mocha = require('mocha');

// Define the value as a global accessible by the given key.
const define = (object, key) => {
    const value = object[key];
    if (typeof window !== 'undefined') {
        window[key] = value;
    }
    if (typeof global !== 'undefined') {
        global[key] = value;
    }
};

// Expose a set of keys for an object as globals values with the same key name.
const expose = (object, ...keys) => keys.forEach((key) => define(object, key));

expose(chai, 'expect');
expose(mocha, 'describe', 'it', 'beforeEach', 'afterEach');
