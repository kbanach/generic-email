class Email {

  constructor() {
    this._recipients = new Set();
  }

  addRecipient(recipient) {
    if (!recipient) {
      throw new Error('Recipient can not be empty');
    }

    if (typeof recipient !== 'string') {
      throw new Error('Recipient has to be a string');
    }

    if (!recipient.trim()) {
      throw new Error('Recipient can not be whitespaces only');
    }

    this._recipients.add(recipient);

    return this;
  }

  getRecipients() {
    return Array.from(this._recipients);
  }
}

module.exports = Email;
