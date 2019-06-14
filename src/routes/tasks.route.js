import authMiddleware from '../middlewares/auth';
import TasksController from '../controllers/tasks.controller';

module.exports = (app) => {
  const tasksController = TasksController(app);

  app.route('/tasks')
    .all(authMiddleware)
    .get(tasksController.getAllTasks)
    .post(tasksController.insertTask);

  app.route('/tasks/:id')
    .all(authMiddleware)
    .get(tasksController.getTaskById)
    .put(tasksController.updateTask)
    .delete(tasksController.deleteTask);
};
