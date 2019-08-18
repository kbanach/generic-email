const index = require('../src/index');


describe('index file', () => {
    test('is exporting Email class that can be used with "new" keyword', () => {
        expect(index.Email).toBeDefined();
        expect(() => { new index.Email() }).not.toThrow();
    });

    test('is exporting EmailAttachment class that can be used with "new" keyword', () => {
        expect(index.EmailAttachment).toBeDefined();
        expect(() => { new index.EmailAttachment() }).not.toThrow();
    });
});