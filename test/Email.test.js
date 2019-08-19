const Email = require('../src/Email');

describe('email class', () => {
  test('can be used with "new" keyword', () => {
    expect(() => { new Email() }).not.toThrow();
  });

  describe('has method addRecipient, which', () => {
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
      test('with keyword "empty" when called without parameters', () => {
        const email = new Email();

        expect(() => {
          email.addRecipient();
        }).toThrow(/empty/ig);
      });

      test('with keyword "string" when called with not a string', () => {
        const email = new Email();

        expect(() => {
          email.addRecipient({});
        }).toThrow(/string/ig);
      });

      test('with keyword "whitespaces" when called with empty string', () => {
        const email = new Email();

        expect(() => {
          email.addRecipient(' ');
        }).toThrow(/whitespaces/ig);
      });
    });

  });
});