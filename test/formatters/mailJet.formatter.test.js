const MailJetFormatter = require('../../src/formatters/mailJet.formatter');

const EmailEnvelope = require('../../src/EmailEnvelope');

describe('Mail Jet formatter', () => {
  test('with static property ID returns "MailJet"', () => {
    expect(MailJetFormatter.ID).toBe('MAIL_JET');
  });

  test('with static property NAME returns "MailJet"', () => {
    expect(MailJetFormatter.NAME).toBe('MailJet');
  });

  test('with static property API_VERSIONS returns array containing "3.1"', () => {
    expect(MailJetFormatter.API_VERSIONS).toEqual(expect.arrayContaining(['3.1']));
  });

  test('with static property DEFAULT_API_VERSION returning "3.1"', () => {
    expect(MailJetFormatter.DEFAULT_API_VERSION).toBe('3.1');
  });

  describe('has static method emailEnvelopeToObject which', () => {
    test('is exposed', () => {
      expect(typeof MailJetFormatter.emailEnvelopeToObject).toBe('function');
    });

    test('throws an error when given email envelope has no recipients', () => {
      const EMAIL = new EmailEnvelope()
      .setSender('sender@sender.com', 'Long Sender Name')
      .setSubject('subject subject')
      .addAttachment(Buffer.from('abc', 'utf-8'), 'filename.txt', 'text/plain')
      .addAttachment(Buffer.from('xyz', 'utf-8'), 'inline.txt', 'text/plain', 'cid1');


      expect(() => {
        MailJetFormatter.emailEnvelopeToObject(EMAIL);
      }).toThrow(/recipient/ig);
    });

    test('maps input email envelope fields', () => {
      const EMAIL = new EmailEnvelope()
        .setSender('sender@sender.com', 'Long Sender Name')
        .setSubject('subject subject')
        .setHtmlContent('<h1>HTML content</h1>')
        .setTxtContent('Plain text content')
        .addRecipient('recipient1@recipient1.com', 'Recipient1 Long Name')
        .addRecipient('recipient2@recipient2.com', 'Recipient2 Long Name')
        .addAttachment(Buffer.from('abc', 'utf-8'), 'filename.txt', 'text/plain')
        .addAttachment(Buffer.from('xyz', 'utf-8'), 'inline.txt', 'text/plain', 'cid1');

      const EXPECTED_OUTPUT = {
        "Messages": [
          {
            "From": {
              "Email": "sender@sender.com",
              "Name": "Long Sender Name"
            },
            "To": [
              {
                "Email": "recipient1@recipient1.com",
                "Name": "Recipient1 Long Name"
              }
            ],
            "Subject": "subject subject",
            "TextPart": "Plain text content",
            "HTMLPart": "<h1>HTML content</h1>",
            "Attachments": [
              {
                "ContentType": "text/plain",
                "Filename": "filename.txt",
                "Base64Content": "YWJj"
              }
            ],
            "InlinedAttachments": [
              {
                "ContentType": "text/plain",
                "Filename": "inline.txt",
                "Base64Content": "eHl6",
                "ContentID": "cid1",
              }
            ]
          }, {
            "From": {
              "Email": "sender@sender.com",
              "Name": "Long Sender Name"
            },
            "To": [
              {
                "Email": "recipient2@recipient2.com",
                "Name": "Recipient2 Long Name"
              }
            ],
            "Subject": "subject subject",
            "TextPart": "Plain text content",
            "HTMLPart": "<h1>HTML content</h1>",
            "Attachments": [
              {
                "ContentType": "text/plain",
                "Filename": "filename.txt",
                "Base64Content": "YWJj"
              }
            ],
            "InlinedAttachments": [
              {
                "ContentType": "text/plain",
                "Filename": "inline.txt",
                "Base64Content": "eHl6",
                "ContentID": "cid1",
              }
            ]
          }
        ]
      };

      expect(MailJetFormatter.emailEnvelopeToObject(EMAIL)).toMatchObject(EXPECTED_OUTPUT);
    })
  });
});