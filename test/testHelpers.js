function shouldThrowWithKeywordWhen(fn, keyword, when) {
  test( /* should throw an error */ `with keyword "${keyword}" ${when}`, () => {
    expect(fn).toThrow(new RegExp(keyword, 'ig'));
  });
}

module.exports = {
  shouldThrowWithKeywordWhen,
};