const emailValidator = require('email-validator');

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

  setSenderEmail(senderEmail) {
    throwWhenUnemptyString(senderEmail, 'Sender email');

    if (!emailValidator.validate(senderEmail)) {
      throw new Error('Sender email is invalid email address');
    }

    this._senderEmail = senderEmail;

    return this;
  }

  getSenderEmail() {
    return this._senderEmail;
  }

  setSenderLongName(senderLongName) {
    throwWhenUnemptyString(senderLongName);

    this._senderLongName = senderLongName;

    return this;
  }

  getSenderLongName() {
    return this._senderLongName;
  }

}

module.exports = EmailEnvelope;
