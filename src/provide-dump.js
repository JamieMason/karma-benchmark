module.exports = provideDump;

function provideDump(obj) {
  obj.dump = function dump() {
    var ngMock = obj.angular && obj.angular.mock ? obj.angular.mock : null;
    obj.__karma__.info({
      dump: _.map(arguments, function (value) {
        return ngMock ? ngMock.dump(value) : value;
      })
    });
  };
}
