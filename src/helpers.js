function throwWhenUnemptyString(str, msgPrefix) {
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

module.exports = {
  throwWhenUnemptyString
};