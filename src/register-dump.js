module.exports = registerDump;

function registerDump(obj, clientApi) {
  obj.dump = function dump() {
    var ngMock = obj.angular && obj.angular.mock ? obj.angular.mock : null;
    clientApi.info({
      dump: _.map(arguments, function (value) {
        return ngMock ? ngMock.dump(value) : value;
      })
    });
  };
}
