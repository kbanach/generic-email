const index = require('../src/index');


describe('index file', () => {
    test('is exporting EmailEnvelope class that can be used with "new" keyword', () => {
        expect(index.EmailEnvelope).toBeDefined();
        expect(() => { new index.EmailEnvelope() }).not.toThrow();
    });

    test('is exporting EmailAddress class that can be used with "new" keyword', () => {
        expect(index.EmailAddress).toBeDefined();
        expect(() => { new index.EmailAddress() }).not.toThrow();
    });

    test('is exporting EmailAttachment class that can be used with "new" keyword', () => {
        expect(index.EmailAttachment).toBeDefined();
        expect(() => { new index.EmailAttachment() }).not.toThrow();
    });

});
