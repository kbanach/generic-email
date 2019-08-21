const emailValidator = require('email-validator');

class Email {

  constructor() {
    this._recipients = new Set();

    this._subject = '';
  }

  addRecipient(recipient) {
    this._throwWhenUnemptyString(recipient, 'Recipient email');

    this._recipients.add(recipient);

    return this;
  }

  getRecipients() {
    return Array.from(this._recipients);
  }

  setSubject(subject) {
    this._throwWhenUnemptyString(subject, 'Email subject');

    this._subject = subject;

    return this;
  }

  getSubject() {
    return this._subject;
  }

  setSenderEmail(senderEmail) {
    this._throwWhenUnemptyString(senderEmail, 'Sender email');

    if (!emailValidator.validate(senderEmail)) {
      throw new Error('Sender email invalid');
    }

    this._senderEmail = senderEmail;

    return this;
  }

  getSenderEmail() {
    return this._senderEmail;
  }

  _throwWhenUnemptyString(str, msgPrefix) {
    if (!str) {
      throw new Error(`${msgPrefix} can not be empty`);
    }

    if (typeof str !== 'string') {
      throw new Error(`${msgPrefix} has to be a string`);
    }

    if (!str.trim()) {
      throw new Error(`${msgPrefix} can not be whitespaces only`);
    }

    return;
  }
}

module.exports = Email;
