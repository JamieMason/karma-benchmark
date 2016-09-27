module.exports = function construct(Instance, a, b, c) {
  if (c) {
    return new Instance(a, b, c);
  }
  if (b) {
    return new Instance(a, b);
  }
  if (a) {
    return new Instance(a);
  }
  return new Instance();
};
