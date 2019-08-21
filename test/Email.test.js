const { shouldThrowWithKeywordWhen } = require('./testHelpers');

const Email = require('../src/Email');


describe('email class', () => {
  test('can be used with "new" keyword', () => {
    expect(() => { new Email() }).not.toThrow();
  });

  describe('has method addRecipient which', () => {
    test('is exposed', () => {
      const email = new Email();

      expect(typeof email.addRecipient).toBe('function');
    });

    describe('when used with valid input should', () => {
      const VALID_INPUT = 'a@a.com';

      test('return same value with getter (as first element of list)', () => {
        const email = new Email();

        email.addRecipient(VALID_INPUT);

        expect(
          email.getRecipients()[0]
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const email = new Email();

        expect(email.addRecipient(VALID_INPUT)).toEqual(email);
      });
    });

    describe('in case of an edge case, like', () => {
      test('adding twice the same address, should add it only once', () => {
        const email = new Email();

        email.addRecipient('a@a.com');
        email.addRecipient('a@a.com');

        expect(email.getRecipients()).toHaveLength(1);
      });
    });

    describe('should throw an error', () => {
      const email = new Email();

      shouldThrowWithKeywordWhen(() => {
            email.addRecipient();
      }, 'empty', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        email.addRecipient({});
      }, 'string', 'when called with not a string');

      shouldThrowWithKeywordWhen(() => {
        email.addRecipient(' ');
      }, 'whitespaces', 'when called with empty string');

    });

  });

  describe('has method setSubject which', () => {

    describe('when used with valid input should', () => {
      const VALID_INPUT = 'test';

      test('return same value with getter', () => {
        const email = new Email();

        email.setSubject(VALID_INPUT);

        expect(
          email.getSubject()
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const email = new Email();

        expect(email.setSubject(VALID_INPUT)).toEqual(email);
      });
    });

    describe('should throw an error', () => {
      const email = new Email();

      shouldThrowWithKeywordWhen(() => {
            email.setSubject();
      }, 'empty', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        email.setSubject({});
      }, 'string', 'when called with not a string');

      shouldThrowWithKeywordWhen(() => {
        email.setSubject(' ');
      }, 'whitespaces', 'when called with empty string');

    });
  });


  describe('has method setSenderEmail which', () => {

    describe('when used with valid input should', () => {
      const VALID_INPUT = 'a@a.com';

      test('return same value with getter', () => {
        const email = new Email();

        email.setSenderEmail(VALID_INPUT);

        expect(
          email.getSenderEmail()
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const email = new Email();

        expect(email.setSenderEmail(VALID_INPUT)).toEqual(email);
      });
    });

    describe('should throw an error', () => {
      const email = new Email();

      shouldThrowWithKeywordWhen(() => {
            email.setSenderEmail();
      }, 'empty', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        email.setSenderEmail({});
      }, 'string', 'when called with not a string');

      shouldThrowWithKeywordWhen(() => {
        email.setSenderEmail(' ');
      }, 'whitespaces', 'when called with empty string');


      shouldThrowWithKeywordWhen(() => {
        email.setSenderEmail('a@a');
      }, 'invalid', 'when called with invalid email');

    });
  });
});