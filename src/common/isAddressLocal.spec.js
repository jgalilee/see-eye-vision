const isAddressLocal = require('./isAddressLocal');

describe('common', () => {
    describe('isAddressLocal', () => {
        describe('when the address is local', () => {
            it('should return true', () => {
                expect(isAddressLocal({
                    family: 'IPv4',
                    internal: false,
                })).to.be.true;
            });
        });

        describe('when the address is not local', () => {
            it('should return false', () => {
                expect(isAddressLocal({
                    family: 'IPv6',
                })).to.be.false;
                expect(isAddressLocal({
                    family: 'IPv4',
                    internal: true,
                })).to.be.false;
            });
        });
    });
});
