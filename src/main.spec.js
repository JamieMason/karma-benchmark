describe('test suite', () => {
  it('should resolve dependencies', () => {
    expect(require('./main.js')).toBeFunction();
  });
});
