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

    describe('has method setFilename, which', () => {
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
            test('with keyword "empty" when called without parameters', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setFilename();
                }).toThrow(/empty/ig);
            });

            test('with keyword "string" when called with not a string', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setFilename({});
                }).toThrow(/string/ig);
            });

            test('with keyword "whitespaces" when called with empty string', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setFilename(' ');
                }).toThrow(/whitespaces/ig);
            });
        });


    });

    describe('has method setMimeType, which', () => {
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
            test('with keyword "empty" when called without parameters', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setMimeType();
                }).toThrow(/empty/ig);
            });

            test('with keyword "string" when called with not a string', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setMimeType({});
                }).toThrow(/string/ig);
            });

            test('with keyword "whitespaces" when called with empty string', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setMimeType(' ');
                }).toThrow(/whitespaces/ig);
            });
        });


    });

    describe('has method setContent, which', () => {
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
            test('with keyword "empty" when called without parameters ', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setContent();
                }).toThrow(/empty/ig);
            });


            test('with keyword "ivalid base64" when passed string is not a valid base64', () => {
                const emailAtt = new EmailAttachment();

                expect(() => {
                    emailAtt.setContent('LOREM IPSUM');
                }).toThrow(/ivalid base64/ig);
            });
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

        test('which called with unhandled content type throw an error with keyword "unknown"', () => {
            const VALID_INPUT = Buffer.from('LOREM IPSUM', 'utf-8');
            const emailAtt = new EmailAttachment();

            emailAtt.setContent(VALID_INPUT);

            expect(() => {
                emailAtt.getContentFormattedAs('TEST');
            }).toThrow(/unknown/ig);
        });
    })
});