const emailValidator = require('email-validator');

const EmailAddress = require('./EmailAddress');

const { throwWhenUnemptyString } = require('./helpers');

class EmailEnvelope {

  constructor() {
    this._recipients = new Set();

    this._subject = '';
    this._senderLongName = '';
  }

  addRecipient(recipient) {
    throwWhenUnemptyString(recipient, 'Recipient');

    this._recipients.add(recipient);

    return this;
  }

  getRecipients() {
    return Array.from(this._recipients);
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

}

module.exports = EmailEnvelope;
