export const provideDump = (obj) => {
  obj.dump = (...args) => {
    const ngMock = obj.angular && obj.angular.mock ? obj.angular.mock : null;
    obj.__karma__.info({
      dump: args.map((value) => (ngMock ? ngMock.dump(value) : value))
    });
  };
};
