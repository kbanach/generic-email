const emailValidator = require('email-validator');

const { throwWhenUnemptyString } = require('./helpers');

class EmailAddress {
  constructor() {
    this._address = null;
    this._longName = null;
  }

  setAddress(address) {
    throwWhenUnemptyString(address, 'Email address');

    if (!emailValidator.validate(address)) {
      throw new Error('Email address is invalid');
    }

    this._address = address;

    return this;
  }

  getAddress() {
    return this._address;
  }

  setLongName(longName) {
    throwWhenUnemptyString(longName, 'Name');

    this._longName = longName;

    return this;
  }

  getLongName() {
    return this._longName;
  }

  toString() {
    let output = '';

    if (this.getLongName()) {
      output += this.getLongName();

      if (this.getAddress()) {
        output += ` <${this.getAddress()}>`;
      }

    } else if (this.getAddress()) {
      output += this.getAddress();
    }

    return output;
  }

}

module.exports = EmailAddress;