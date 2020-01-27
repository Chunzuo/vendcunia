var frontRouter = require('./front');

module.exports = function(app, connection) {
  app.use('/vendcunia_api', frontRouter(connection));
}