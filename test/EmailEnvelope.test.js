const { shouldThrowWithKeywordWhen } = require('./testHelpers');

const EmailEnvelope = require('../src/EmailEnvelope');
const EmailAttachment = require('../src/EmailAttachment');


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

        const firstRecipient = email.getRecipients()[0].toString();

        expect(firstRecipient).toEqual(VALID_INPUT);
      });

      test('be able to handle more than one email', () => {
        const email = new EmailEnvelope();

        const EMAIL1 = 'a@a.com';
        const EMAIL2 = 'b@b.com';

        email.addRecipient(EMAIL1);
        email.addRecipient(EMAIL2);

        expect(email.getRecipients()).toHaveLength(2);

        const stringifiedRecipients = email.getRecipients().map((recp) => recp.toString());

        expect(stringifiedRecipients).toEqual(
          expect.arrayContaining([EMAIL1, EMAIL2])
        );
      });

      test('be chainable', () => {
        const email = new EmailEnvelope();

        expect(email.addRecipient(VALID_INPUT)).toEqual(email);
      });
    });

    describe('when used with second parameter', () => {
      test('return first and second parameter with getter', () => {
        const email = new EmailEnvelope();

        const FIRST_PARAM = 'a@a.com';
        const SECOND_PARAM = 'Abcd Xyz';

        email.addRecipient(FIRST_PARAM, SECOND_PARAM);

        const firstRecipient = email.getRecipients()[0].toString();

        expect(firstRecipient).toMatch(FIRST_PARAM);
        expect(firstRecipient).toMatch(SECOND_PARAM);
      });

      test('do not confuse email and name pairs', () => {
        const email = new EmailEnvelope();

        const FIRST_EMAIL = 'a@a.com';
        const FIRST_NAME = 'Abcd Xyz';
        email.addRecipient(FIRST_EMAIL, FIRST_NAME);

        const SECOND_EMAIL = 'b@b.com';
        const SECOND_NAME = 'Bcde Xyz';
        email.addRecipient(SECOND_EMAIL, SECOND_NAME);

        const firstRecipient = email.getRecipients().find((recp) => { return recp.toString().includes(FIRST_EMAIL) });
        expect(firstRecipient.getAddress()).toMatch(FIRST_EMAIL);
        expect(firstRecipient.getLongName()).toMatch(FIRST_NAME);

        const secondRecipient = email.getRecipients().find((recp) => { return recp.toString().includes(SECOND_EMAIL) });
        expect(secondRecipient.getAddress()).toMatch(SECOND_EMAIL);
        expect(secondRecipient.getLongName()).toMatch(SECOND_NAME);
      });
    });

    describe('in case of an edge case, like', () => {
      test('adding twice the same address, should add it only once', () => {
        const email = new EmailEnvelope();

        email.addRecipient('a@a.com');
        email.addRecipient('a@a.com');

        expect(email.getRecipients()).toHaveLength(1);
      });

      test('adding different address, but same name, should add both', () => {
        const email = new EmailEnvelope();

        email.addRecipient('a@a.com', 'Same Name');
        email.addRecipient('b@b.com', 'Same Name');

        expect(email.getRecipients()).toHaveLength(2);
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

  describe('has method addAttachment which', () => {
    test('is exposed', () => {
      const email = new EmailEnvelope();

      expect(typeof email.addAttachment).toBe('function');
    });

    describe('when used with valid input should', () => {
      const VALID_INPUT_BUFFER = Buffer.from('abc');
      const VALID_INPUT_FILENAME = 'acb.zxy';
      const VALID_INPUT_MIME = 'abc/xyz';
      const VALID_INPUT_CID = 'id1';

      const VALID_INPUT = [
        VALID_INPUT_BUFFER,   // fileBuffer
        VALID_INPUT_FILENAME, // fileName
        VALID_INPUT_MIME,     // fileMimeType
        // [OPTIONAL] fileContentId
      ];

      const EQUIVALENT_EMAIL_ATTACHMENT = new EmailAttachment()
        .setContent(VALID_INPUT_BUFFER)
        .setFilename(VALID_INPUT_FILENAME)
        .setMimeType(VALID_INPUT_MIME);


      const VALID_INPUT_WITH_CID = [
        VALID_INPUT_BUFFER,   // fileBuffer
        VALID_INPUT_FILENAME, // fileName
        VALID_INPUT_MIME,     // fileMimeType
        VALID_INPUT_CID,      // [OPTIONAL] fileContentId
      ];

      const EQUIVALENT_EMAIL_ATTACHMENT_WITH_CID = new EmailAttachment()
        .setContent(VALID_INPUT_BUFFER)
        .setFilename(VALID_INPUT_FILENAME)
        .setMimeType(VALID_INPUT_MIME)
        .setContentId(VALID_INPUT_CID);


      test('return equivalent EmailAttachment with getter', () => {
        const email = new EmailEnvelope();

        email.addAttachment(...VALID_INPUT);

        const attachment = email.getAttachments().find((att) => {
          return att.getFilename() === VALID_INPUT_FILENAME;
        });

        expect(attachment).toMatchObject(EQUIVALENT_EMAIL_ATTACHMENT);
      });


      test('return equivalent EmailAttachment with optional content ID with getter', () => {
        const email = new EmailEnvelope();

        email.addAttachment(...VALID_INPUT_WITH_CID);

        const attachment = email.getAttachments().find((att) => {
          return att.getContentId() === VALID_INPUT_CID;
        });

        expect(attachment).toMatchObject(EQUIVALENT_EMAIL_ATTACHMENT_WITH_CID);
      });


      test('be chainable', () => {
        const email = new EmailEnvelope();

        expect(email.addAttachment(...VALID_INPUT)).toEqual(email);
      });
    });

    describe('should throw an error', () => {
      const email = new EmailEnvelope();

      shouldThrowWithKeywordWhen(() => {
        email.addRecipient();
      }, 'empty', 'when called without parameters');
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

  describe('has method setHtmlContent which', () => {

    describe('when used with valid input should', () => {
      const VALID_INPUT = '<h1>test content</h1>';

      test('return same value with getter', () => {
        const email = new EmailEnvelope();

        email.setHtmlContent(VALID_INPUT);

        expect(
          email.getHtmlContent()
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const email = new EmailEnvelope();

        expect(email.setHtmlContent(VALID_INPUT)).toEqual(email);
      });
    });

    describe('should throw an error', () => {
      const email = new EmailEnvelope();

      shouldThrowWithKeywordWhen(() => {
        email.setHtmlContent();
      }, 'empty', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        email.setHtmlContent({});
      }, 'string', 'when called with not a string');

      shouldThrowWithKeywordWhen(() => {
        email.setHtmlContent(' ');
      }, 'whitespaces', 'when called with empty string');

    });
  });

  describe('has method setTxtContent which', () => {

    describe('when used with valid input should', () => {
      const VALID_INPUT = '<h1>test content</h1>';

      test('return same value with getter', () => {
        const email = new EmailEnvelope();

        email.setTxtContent(VALID_INPUT);

        expect(
          email.getTxtContent()
        ).toEqual(VALID_INPUT);
      });

      test('be chainable', () => {
        const email = new EmailEnvelope();

        expect(email.setTxtContent(VALID_INPUT)).toEqual(email);
      });
    });

    describe('should throw an error', () => {
      const email = new EmailEnvelope();

      shouldThrowWithKeywordWhen(() => {
        email.setTxtContent();
      }, 'empty', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        email.setTxtContent({});
      }, 'string', 'when called with not a string');

      shouldThrowWithKeywordWhen(() => {
        email.setTxtContent(' ');
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
          email.getSender().getAddress()
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

        expect(email.getSender().getAddress()).toMatch(FIRST_PARAM);
        expect(email.getSender().getLongName()).toMatch(SECOND_PARAM);
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

  describe('has formatters which', () => {
    test('is exposed as static property', () => {
      expect(typeof EmailEnvelope.FORMATTERS).toBe('object');
    });

    test('is exposed as instance property', () => {
      const email = new EmailEnvelope();

      expect(typeof email.FORMATTERS).toBe('object');
    });

    test('returns same result for static property and instance property', () => {
      const email = new EmailEnvelope();

      expect(email.FORMATTERS).toStrictEqual(EmailEnvelope.FORMATTERS);
    });

    test('returns MAIL_JET', () => {
      const email = new EmailEnvelope();

      expect(email.FORMATTERS).toHaveProperty('MAIL_JET');
    });

  });

  describe('has method toFormattedObject which', () => {
    test('is exposed', () => {
      const email = new EmailEnvelope();
      expect(typeof email.toFormattedObject).toBe('function');
    });

    describe('when used with valid input should', () => {
      const VALID_INPUT = EmailEnvelope.FORMATTERS.MAIL_JET;

      describe('return object containing previously set parameters', () => {
        const email = new EmailEnvelope();

        email
          .setSender('sender@sender.com')
          .addRecipient('recipient@recipient.com')
          .setSubject('subject subject');


        test('like sender', () => {
          const FORMATTED_OBJECT = email.toFormattedObject(VALID_INPUT);
          expect(JSON.stringify(FORMATTED_OBJECT)).toMatch('sender@sender.com');
        });

        test('like recipient', () => {
          const FORMATTED_OBJECT = email.toFormattedObject(VALID_INPUT);
          expect(JSON.stringify(FORMATTED_OBJECT)).toMatch('recipient@recipient.com');
        });

        test('like subject', () => {
          const FORMATTED_OBJECT = email.toFormattedObject(VALID_INPUT);
          expect(JSON.stringify(FORMATTED_OBJECT)).toMatch('subject subject');
        });
      });
    });

    describe('should throw an error', () => {
      const email = new EmailEnvelope();

      shouldThrowWithKeywordWhen(() => {
        email.toFormattedObject();
      }, 'formatter', 'when called without parameters');

      shouldThrowWithKeywordWhen(() => {
        email.toFormattedObject({});
      }, 'formatter', 'when called with not a valid formatter');

    });
  });

});