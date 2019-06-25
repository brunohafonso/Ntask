const TasksService = require('../services/tasks.service');


module.exports = (app) => {
  const tasksService = TasksService(app);

  function getAllTasks(req, res) {
    tasksService.getAllTasks()
      .then(response => res.status(response.statusCode).json(response.data))
      .catch(err => res.status(err.statusCode).json(err.data));
  }

  function insertTask(req, res) {
    tasksService.insertTask(req.body)
      .then(response => res.status(response.statusCode).json(response.data))
      .catch(err => res.status(err.statusCode).json(err.data));
  }

  function getTaskById(req, res) {
    tasksService.getTaskById(req.params.id)
      .then(response => res.status(response.statusCode).json(response.data))
      .catch(err => res.status(err.statusCode).json(err.data));
  }

  function updateTask(req, res) {
    tasksService.updateTask(req.body, req.params.id)
      .then(response => res.sendStatus(response.statusCode))
      .catch(err => res.status(err.statusCode).json(err.data));
  }

  function deleteTask(req, res) {
    tasksService.deleteTask(req.params.id)
      .then(response => res.sendStatus(response.statusCode))
      .catch(err => res.status(err.statusCode).json(err.data));
  }

  return {
    getAllTasks,
    insertTask,
    getTaskById,
    updateTask,
    deleteTask,
  };
};
