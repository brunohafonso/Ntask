import app from './app';

const PORT = app.get('port');

(async function () {
  await app.database.db.sync().done();
  app.listen(PORT, () => {
    console.log(`Ntask listening on port ${PORT}`);
  });
}());
