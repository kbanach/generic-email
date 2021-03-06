const objectHash = require('object-hash');

const { throwWhenUnemptyString } = require('./helpers');

const CONTENT_TYPES = {
  BASE64: 'base64',
  BUFFER: 'buffer',
};

class EmailAttachment {
  static get CONTENT_TYPE() {
    return { ...CONTENT_TYPES };
  }

  constructor() {
    this._content = null;
    this._filename = null;
    this._mime = null;
    this._cid = null;
  }

  setFilename(filename) {
    throwWhenUnemptyString(filename, 'Filename');

    this._filename = filename;

    return this;
  }

  getFilename() {
    return this._filename;
  }

  setMimeType(mimeType) {
    throwWhenUnemptyString(mimeType, 'Mime type');

    this._mime = mimeType;

    return this;
  }

  getMimeType() {
    return this._mime;
  }

  setContent(content) {
    if (!content) {
      throw new Error('Content can not be empty');
    }

    if (Buffer.isBuffer(content)) {
      this._setContentFromBuffer(content);

      return this;
    } if (typeof content === 'string') {
      this._setContentFromBase64(content);

      return this;
    }

    throw new Error('Wrong type of content passed');
  }

  getContent() {
    return this._content;
  }

  setContentId(contentId) {
    throwWhenUnemptyString(contentId, 'Content ID');

    this._cid = contentId;

    return this;
  }

  getContentId() {
    return this._cid;
  }

  getContentFormattedAs(format = CONTENT_TYPES.BUFFER) {
    if (format === CONTENT_TYPES.BUFFER) {
      return this.getContent();
    }

    if (format === CONTENT_TYPES.BASE64) {
      return this.getContent().toString('base64');
    }

    throw new Error('Unknown type passed to content getter as formatter');
  }

  getChecksum() {
    return objectHash({
      content: this._content,
      filename: this._filename,
    });
  }

  _setContentFromBuffer(contentAsBuffer) {
    this._content = contentAsBuffer;
  }

  _setContentFromBase64(contentAsBase64) {
    const contentAsBuffer = Buffer.from(contentAsBase64, 'base64');

    // is base64 valid
    if (contentAsBuffer.toString('base64') !== contentAsBase64) {
      throw new Error('Content is an ivalid base64 string');
    }

    this._setContentFromBuffer(contentAsBuffer);
  }
}

module.exports = EmailAttachment;
