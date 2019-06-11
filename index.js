import app from './app';

const PORT = app.get('port');

(function init() {
  app.database.db.sequelize.sync().done(() => {
    app.listen(PORT, () => {
      console.log(`Ntask listening on port ${PORT}`);
    });
  });
}());