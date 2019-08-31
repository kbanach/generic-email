const IFormatter = require('./IFormatter');

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

  static emailEnvelopeToObject(emailEnvelope) {
    const Messages = [];

    const recipients = emailEnvelope.getRecipients();

    // // TODO: write unit tests to check that
    // if (!recipients || recipients.length === 0) {
    //   throw new Error('No recipients found');
    // }

    for (const recp of recipients) {
      const msg = {
      };

      // sender
      const sender = {
        Email: emailEnvelope.getSenderEmail(),
      };

      if (emailEnvelope.getSenderName()) {
        sender.Name = emailEnvelope.getSenderName();
      }

      msg.From = sender;

      // recipient
      // TODO: add recipients
      // issues: how to get raw email address AND long name of recipient
      // (equivalent of getSenderEmail() and getSenderName())


      // subject
      msg.Subject = emailEnvelope.getSubject();

      // attachments
      // TODO: handle filtering of attachments/inline attachments to separate them to:
      // msg.Attachments = []
      // msg.InlinedAttachments = []

      Messages.push(msg);
    }

    return {
      Messages,
    };
  }
}

module.exports = MailJetFormatter;