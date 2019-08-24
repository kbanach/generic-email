const { shouldThrowWithKeywordWhen } = require('./testHelpers');

const EmailEnvelope = require('../src/EmailEnvelope');


describe('email envelope class', () => {
  test('can be used with "new" keyword', () => {
    expect(() => { new EmailEnvelope() }).not.toThrow();
  });

  describe('has method addRecipient which', () => {
    test('is exposed', () => {
      const email = new EmailEnvelope();

      expect(typeof email.addRecipient).toBe('function');
    });

    describe('when used with valid input should', () => {
      const VALID_INPUT = 'a@a.com';

      test('return same value with getter (as first element of list)', () => {
        const email = new EmailEnvelope();

        email.addRecipient(VALID_INPUT);

        expect(
          email.getRecipients()
        ).toEqual(expect.arrayContaining([ VALID_INPUT ]));
      });

      test('be chainable', () => {
        const email = new EmailEnvelope();

        expect(email.addRecipient(VALID_INPUT)).toEqual(email);
      });
    });

    describe('in case of an edge case, like', () => {
      test('adding twice the same address, should add it only once', () => {
        const email = new EmailEnvelope();

        email.addRecipient('a@a.com');
        email.addRecipient('a@a.com');

        expect(email.getRecipients()).toHaveLength(1);
      });
    });

    describe('should throw an error', () => {
      const email = new EmailEnvelope();

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
        const email = new EmailEnvelope();

        email.setSubject(VALID_INPUT);

        expect(
          email.getSubject()
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const email = new EmailEnvelope();

        expect(email.setSubject(VALID_INPUT)).toEqual(email);
      });
    });

    describe('should throw an error', () => {
      const email = new EmailEnvelope();

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

  describe('has method setSender which', () => {

    describe('when used with valid input should', () => {
      const VALID_INPUT = 'a@a.com';

      test('return same value with getter', () => {
        const email = new EmailEnvelope();

        email.setSender(VALID_INPUT);

        expect(
          email.getSender()
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const email = new EmailEnvelope();

        expect(email.setSender(VALID_INPUT)).toEqual(email);
      });
    });

    describe('when used with second parameter', () => {
      test('return first and second parameter with getter', () => {
        const email = new EmailEnvelope();

        const FIRST_PARAM = 'a@a.com';
        const SECOND_PARAM = 'Abcd Xyz';

        email.setSender(FIRST_PARAM, SECOND_PARAM);

        expect(email.getSender()).toMatch(FIRST_PARAM);
        expect(email.getSender()).toMatch(SECOND_PARAM);
      });
    });

    describe('should throw an error', () => {
      const email = new EmailEnvelope();

      shouldThrowWithKeywordWhen(() => {
            email.setSender();
      }, 'empty', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        email.setSender({});
      }, 'string', 'when called with not a string');

      shouldThrowWithKeywordWhen(() => {
        email.setSender(' ');
      }, 'whitespaces', 'when called with empty string');


      shouldThrowWithKeywordWhen(() => {
        email.setSender('a@a');
      }, 'invalid', 'when called with invalid email');

    });
  });

  describe.skip('has method setSenderLongName which', () => {

    describe('when used with valid input should', () => {
      const VALID_INPUT = 'Test Test';

      test('return same value with getter', () => {
        const email = new EmailEnvelope();

        email.setSenderLongName(VALID_INPUT);

        expect(
          email.getSenderLongName()
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const email = new EmailEnvelope();

        expect(email.setSenderLongName(VALID_INPUT)).toEqual(email);
      });
    });

    describe('should throw an error', () => {
      const email = new EmailEnvelope();

      shouldThrowWithKeywordWhen(() => {
            email.setSenderLongName();
      }, 'empty', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        email.setSenderLongName({});
      }, 'string', 'when called with not a string');

      shouldThrowWithKeywordWhen(() => {
        email.setSenderLongName(' ');
      }, 'whitespaces', 'when called with empty string');

    });
  });
});