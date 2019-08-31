const emailValidator = require('email-validator');

const EmailAddress = require('./EmailAddress');
const EmailAttachment = require('./EmailAttachment');

const { throwWhenUnemptyString } = require('./helpers');

const MailJetFormatter = require('./formatters/mailJet.formatter');

class EmailEnvelope {

  static get FORMATTERS() {
    return {
      [MailJetFormatter.ID]: MailJetFormatter,
    };
  }

  static _hasFormatter(formatter) {
    return formatter && Object.keys(EmailEnvelope.FORMATTERS).includes(formatter.ID);
  }

  get FORMATTERS() {
    return EmailEnvelope.FORMATTERS;
  }

  constructor() {
    this._recipients = new Map();
    this._attachments = new Map();

    this._subject = '';
    this._senderLongName = '';
  }

  addRecipient(recipientEmail, recipientLongName) {
    const recipient = new EmailAddress();

    recipient.setAddress(recipientEmail);

    if (recipientLongName) {
      recipient.setLongName(recipientLongName);
    }

    this._recipients.set(recipientEmail, recipient);

    return this;
  }

  getRecipients() {
    return Array
      .from(this._recipients.values())
      .map((recipient) => {
        return recipient.toString();
      });
  }

  setSubject(subject) {
    throwWhenUnemptyString(subject, 'Email subject');

    this._subject = subject;

    return this;
  }

  getSubject() {
    return this._subject;
  }

  setSender(senderEmail, senderLongName) {
    const sender = new EmailAddress();

    sender.setAddress(senderEmail);

    if (senderLongName) {
      sender.setLongName(senderLongName);
    }

    this._senderEmail = sender;

    return this;
  }

  getSender() {
    return this._senderEmail.toString();
  }

  getSenderEmail() {
    return this._senderEmail.getAddress();
  }

  getSenderName() {
    return this._senderEmail.getLongName();
  }

  addAttachment(fileBuffer, fileName, fileMimeType, fileContentId) {
    const attachment = new EmailAttachment()
      .setContent(fileBuffer)
      .setFilename(fileName)
      .setMimeType(fileMimeType);

    if (fileContentId) {
      attachment.setContentId(fileContentId);
    }

    this._attachments.set(
      attachment.getChecksum(),
      attachment,
    );

    return this;
  }

  getAttachments() {
    return Array
      .from(this._attachments.values())
  }

  toFormattedObject(formatter) {
    if (!EmailEnvelope._hasFormatter(formatter)) {
      throw new Error('Formatter has to be specified');
    }

    return formatter.emailEnvelopeToObject(this);
  }
}

module.exports = EmailEnvelope;
