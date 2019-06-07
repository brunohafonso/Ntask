module.exports = (app) => {
  const Tasks = app.models.tasks;
  app.get('/tasks', async (req, res) => {
    const result = await Tasks.findAll({});
    res.json(result);
  });
};
