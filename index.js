const app = require('./app');

const PORT = app.get('port');

(function init() {
  app.get('db').sequelize.sync().done(() => {
    app.listen(PORT, () => {
      console.log(`Ntask listening on port ${PORT}`);
    });
  });
}());
