const IFormatter = require('./IFormatter');

const EmailAttachment = require('../EmailAttachment');

class MailJetFormatter extends IFormatter {
  static get ID() {
    return 'MAIL_JET';
  }

  static get NAME() {
    return 'MailJet';
  }

  static get API_VERSIONS() {
    return [
      '3.1'
    ];
  }

  static get DEFAULT_API_VERSION() {
    return '3.1';
  }

  static _filterInlineAttachments(attachments) {
    return attachments.filter((att) => {
      return att.getContentId(); // has ANY truthy content ID
    });
  }

  static _filterNormalAttachments(attachments) {
    return attachments.filter((att) => {
      return !(att.getContentId()); // does not have content ID
    });
  }

  static emailAddressToObject(address) {
    const mailJetAddress = {
      Email: address.getAddress(),
    };

    if (address.getLongName()) {
      mailJetAddress.Name = address.getLongName();
    }

    return mailJetAddress;
  }

  static emailAttachmentToObject(attachment) {
    return {
      ContentType: attachment.getMimeType(),
      Filename: attachment.getFilename(),
      Base64Content: attachment.getContentFormattedAs(EmailAttachment.CONTENT_TYPE.BASE64),
      ContentID: attachment.getContentId(),
    };
  }

  static emailEnvelopeToObject(emailEnvelope) {

    const recipients = emailEnvelope.getRecipients();

    if (!recipients || recipients.length === 0) {
      throw new Error('No recipients found');
    }

    const Messages = [];

    const subject = emailEnvelope.getSubject();
    const from = MailJetFormatter.emailAddressToObject(emailEnvelope.getSender());

    const attachments = [
      ...MailJetFormatter
        ._filterNormalAttachments(emailEnvelope.getAttachments())
        .map((att) => {
          return MailJetFormatter.emailAttachmentToObject(att);
        }),
    ];

    const inlineAttachments = [
      ...MailJetFormatter
        ._filterInlineAttachments(emailEnvelope.getAttachments())
        .map((att) => {
          return MailJetFormatter.emailAttachmentToObject(att);
        }),
    ];

    for (const recp of recipients) {
      const msg = { };

      // subject
      msg.Subject = subject;

      // sender
      msg.From = from;

      // recipient
      msg.To = [
        MailJetFormatter.emailAddressToObject(recp),
      ];

      // attachments
      msg.Attachments = attachments;
      msg.InlinedAttachments = inlineAttachments;

      Messages.push(msg);
    }

    return {
      Messages,
    };
  }
}

module.exports = MailJetFormatter;