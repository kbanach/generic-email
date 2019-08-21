const { shouldThrowWithKeywordWhen } = require('./testHelpers');

const EmailAttachment = require('../src/EmailAttachment');

describe('email attachment class', () => {
    test('can be used with "new" keyword', () => {
        expect(() => { new EmailAttachment() }).not.toThrow();
    });

    describe('has static property "CONTENT_TYPE"', () => {
        test('exposed', () => {
            expect(EmailAttachment.CONTENT_TYPE).toBeDefined();
        });

        test('to have property "BASE64"', () => {
            expect(EmailAttachment.CONTENT_TYPE.BASE64).toBeDefined();
        });

        test('to have property "BUFFER"', () => {
            expect(EmailAttachment.CONTENT_TYPE.BASE64).toBeDefined();
        });
    });

    describe('has method setFilename which', () => {
        test('is exposed', () => {
            const emailAtt = new EmailAttachment();

            expect(typeof emailAtt.setFilename).toBe('function');
        });

        describe('when used with valid input should', () => {
            test('return the same value with getter', () => {
                const VALID_INPUT = 'FILENAME.txt';
                const emailAtt = new EmailAttachment();

                emailAtt.setFilename(VALID_INPUT);

                expect(emailAtt.getFilename()).toEqual(VALID_INPUT);
            });

            test('be chainable', () => {
                const VALID_INPUT = 'text/plain';
                const emailAtt = new EmailAttachment();

                expect(emailAtt.setFilename(VALID_INPUT)).toEqual(emailAtt);
            });
        });

        describe('should throw an error', () => {
            const emailAtt = new EmailAttachment();

            shouldThrowWithKeywordWhen(() => {
                emailAtt.setFilename();
            }, 'empty', 'when called without parameters');


            shouldThrowWithKeywordWhen(() => {
                emailAtt.setFilename({});
            }, 'string', 'when called with not a string');


            shouldThrowWithKeywordWhen(() => {
                emailAtt.setFilename(' ');
            }, 'whitespaces', 'when called with empty string');
        });


    });

    describe('has method setMimeType which', () => {
        test('exposed', () => {
            const emailAtt = new EmailAttachment();

            expect(typeof emailAtt.setMimeType).toBe('function');
        });

        describe('when used with valid input should', () => {
            const VALID_INPUT = 'text/plain';

            test('return same value with getter', () => {
                const emailAtt = new EmailAttachment();

                emailAtt.setMimeType(VALID_INPUT);

                expect(emailAtt.getMimeType()).toEqual(VALID_INPUT);
            });

            test('be chainable', () => {
                const emailAtt = new EmailAttachment();

                expect(emailAtt.setMimeType(VALID_INPUT)).toEqual(emailAtt);
            });
        });


        describe('should throw an error', () => {
            const emailAtt = new EmailAttachment();

            shouldThrowWithKeywordWhen(() => {
                    emailAtt.setMimeType();
            }, 'empty', 'when called without parameters');


            shouldThrowWithKeywordWhen(() => {
                emailAtt.setMimeType({});
            }, 'string', 'when called with not a string');


            shouldThrowWithKeywordWhen(() => {
                emailAtt.setMimeType(' ');
            }, 'whitespaces', 'when called with empty string');

        });


    });

    describe('has method setContent which', () => {
        test('exposed', () => {
            const emailAtt = new EmailAttachment();

            expect(typeof emailAtt.setContent).toBe('function');
        });


        describe('when used with valid input should', () => {
            test('return same value with default getter', () => {
                const VALID_INPUT = Buffer.from('LOREM IPSUM', 'utf-8');
                const emailAtt = new EmailAttachment();

                emailAtt.setContent(VALID_INPUT);

                expect(emailAtt.getContent()).toEqual(VALID_INPUT);
            });

            test('return buffer when passed base64 input', () => {
                const VALID_INPUT = Buffer.from('LOREM IPSUM', 'utf-8').toString('base64');
                const emailAtt = new EmailAttachment();

                emailAtt.setContent(VALID_INPUT);

                expect(Buffer.isBuffer(emailAtt.getContent())).toBe(true);
            });

            test('be chainable', () => {
                const VALID_INPUT = Buffer.from('LOREM IPSUM', 'utf-8');
                const emailAtt = new EmailAttachment();

                expect(emailAtt.setContent(VALID_INPUT)).toEqual(emailAtt);
            });

        });


        describe('should throw an error', () => {
            const emailAtt = new EmailAttachment();

            shouldThrowWithKeywordWhen(() => {
                emailAtt.setContent();
            }, 'empty', 'when called without parameters');


            shouldThrowWithKeywordWhen(() => {
                emailAtt.setContent('LOREM IPSUM');
            }, 'ivalid base64', 'when passed string is not a valid base64');

        });


        describe('should not throw', () => {
            test('when called with a Buffer', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setContent(Buffer.from('LOREM IPSUM', 'utf-8'));
                }).not.toThrow();
            });

            test('when called with a base64 string', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setContent(Buffer.from('LOREM IPSUM', 'utf-8').toString('base64'));
                }).not.toThrow();
            });
        });

    });

    describe('has method getContentFormattedAs', () => {
        test('which returns buffer by default', () => {
            const VALID_INPUT = Buffer.from('LOREM IPSUM', 'utf-8');
            const emailAtt = new EmailAttachment();

            emailAtt.setContent(VALID_INPUT);

            expect(
                Buffer.isBuffer(emailAtt.getContentFormattedAs())
            ).toBe(true);
        });

        test('which returns base64 string when this formatter is passed as parameter', () => {
            const VALID_INPUT = Buffer.from('LOREM IPSUM', 'utf-8');
            const emailAtt = new EmailAttachment();

            emailAtt.setContent(VALID_INPUT);

            expect(
                typeof emailAtt.getContentFormattedAs(EmailAttachment.CONTENT_TYPE.BASE64)
            ).toBe('string');
        });


        describe('should throw an error', () => {

            shouldThrowWithKeywordWhen(() => {
                const VALID_INPUT = Buffer.from('LOREM IPSUM', 'utf-8');
                const emailAtt = new EmailAttachment();

                emailAtt.setContent(VALID_INPUT);

                emailAtt.getContentFormattedAs('TEST');
            }, 'unknown', 'when called with unhandled content type');

        });

    })
});