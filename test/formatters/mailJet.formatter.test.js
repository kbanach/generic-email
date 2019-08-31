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

  describe('has static method emailEnvelopeToObject', () => {
    test('exposed', () => {
      expect(typeof MailJetFormatter.emailEnvelopeToObject).toBe('function');
    });

    test('which maps input email envelope fields', () => {
      const EMAIL = new EmailEnvelope()
        .setSender('sender@sender.com', 'Long Sender Name')
        .setSubject('subject subject')
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
            // "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
            // "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!",
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
            // "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
            // "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!",
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