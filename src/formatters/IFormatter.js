class IFormatter {

  static get API_VERSIONS() {
    throw new Error(`Interface property of IFormatter interface. Should be overwritten.`);
  }

  static get DEFAULT_API_VERSION() {
    throw new Error(`Interface property of IFormatter interface. Should be overwritten.`);
  }

  static get NAME() {
    throw new Error(`Interface property of IFormatter interface. Should be overwritten.`);
  }

  static get ID() {
    throw new Error(`Interface property of IFormatter interface. Should be overwritten.`);
  }

  static emailEnvelopeToObject() {
    throw new Error(`Interface method of IFormatter interface. Should be overwritten.`);
  }

  static emailAttachmentToObject() {
    throw new Error(`Interface method of IFormatter interface. Should be overwritten.`);
  }

  static emailAddressToObject() {
    throw new Error(`Interface method of IFormatter interface. Should be overwritten.`);
  }

}

module.exports = IFormatter;