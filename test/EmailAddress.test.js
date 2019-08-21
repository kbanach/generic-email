const { shouldThrowWithKeywordWhen } = require('./testHelpers');

const EmailAddress = require('../src/EmailAddress');


describe('email address class', () => {
  test('can be used with "new" keyword', () => {
    expect(() => { new EmailAddress() }).not.toThrow();
  });

  describe('has method setAddress which', () => {
    test('is exposed', () => {
      const emailAddress = new EmailAddress();

      expect(typeof emailAddress.setAddress).toBe('function');
    });

    describe('when used with valid input should', () => {
      const VALID_INPUT = 'a@a.com';

      test('return same value with getter', () => {
        const emailAddress = new EmailAddress();

        emailAddress.setAddress(VALID_INPUT);

        expect(
          emailAddress.getAddress()
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const emailAddress = new EmailAddress();

        expect(emailAddress.setAddress(VALID_INPUT)).toEqual(emailAddress);
      });
    });

    describe('should throw an error', () => {
      const emailAddress = new EmailAddress();

      shouldThrowWithKeywordWhen(() => {
            emailAddress.setAddress();
      }, 'empty', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        emailAddress.setAddress({});
      }, 'string', 'when called with not a string');

      shouldThrowWithKeywordWhen(() => {
        emailAddress.setAddress(' ');
      }, 'whitespaces', 'when called with empty string');

      shouldThrowWithKeywordWhen(() => {
        emailAddress.setAddress('a@a');
      }, 'invalid', 'when called with invalid email');

    });

  });

  describe('has method setLongName which', () => {
    test('is exposed', () => {
      const emailAddress = new EmailAddress();

      expect(typeof emailAddress.setLongName).toBe('function');
    });

    describe('when used with valid input should', () => {
      const VALID_INPUT = 'Test Test';

      test('return same value with getter', () => {
        const emailAddress = new EmailAddress();

        emailAddress.setLongName(VALID_INPUT);

        expect(
          emailAddress.getLongName()
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const emailAddress = new EmailAddress();

        expect(emailAddress.setLongName(VALID_INPUT)).toEqual(emailAddress);
      });
    });

    describe('should throw an error', () => {
      const emailAddress = new EmailAddress();

      shouldThrowWithKeywordWhen(() => {
            emailAddress.setLongName();
      }, 'empty', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        emailAddress.setLongName({});
      }, 'string', 'when called with not a string');

      shouldThrowWithKeywordWhen(() => {
        emailAddress.setLongName(' ');
      }, 'whitespaces', 'when called with empty string');

    });

  });

  describe('overloads method toString() which', () => {
    test('called should return email address in pointy brackets', () => {
      const emailAddress = new EmailAddress();

      emailAddress
        .setLongName('Test Test')
        .setAddress('a@a.com');

      expect(emailAddress.toString()).toMatch('<a@a.com>');

    });

    test('called on email without long name should return email address without brackets', () => {
      const emailAddress = new EmailAddress();

      emailAddress
        // .setLongName('Test Test') // <--  no long name
        .setAddress('a@a.com');

      expect(emailAddress.toString()).not.toMatch('<a@a.com>');
    });


    test('called should return long name', () => {
      const emailAddress = new EmailAddress();

      emailAddress
        .setLongName('Test Test')
        .setAddress('a@a.com');

      expect(emailAddress.toString()).toMatch('Test Test');
    });



  });
});