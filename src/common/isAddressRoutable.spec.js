import isAddressRoutable from './isAddressRoutable';

describe('common', () => {
    describe('isAddressRoutable', () => {
        describe('when the address is routable', () => {
            it('should return true', () => {
                expect(isAddressRoutable({
                    address: 'bad',
                })).to.be.false;
            });
        });

        describe('when the address is not routable', () => {
            it('should return false', () => {
                expect(isAddressRoutable({
                    address: '127.0.0.1',
                })).to.be.true;
            });
        });
    });
});
