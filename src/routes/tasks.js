import * as httpStatus from 'http-status';
import authMiddleware from '../middlewares/auth';

module.exports = (app) => {
  const Tasks = app.database.db.models.Tasks;
  app.route('/tasks')
    .all(authMiddleware)
    .get(async (_req, res) => {
      Tasks.findAll({})
        .then((tasks) => {
          res.status(httpStatus.OK).json({ tasks });
        })
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `error to get the task - ${err.message}` }));
    })
    .post(async (req, res) => {
      Tasks.create(req.body)
        .then(task => res.status(httpStatus.CREATED).json({ task }))
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `error to create task - ${err.message}` }));
    });

  app.route('/tasks/:id')
    .all(authMiddleware)
    .get(async (req, res) => {
      Tasks.findOne({ where: req.params })
        .then((task) => {
          if (!task) {
            res.status(httpStatus.NOT_FOUND).json({ message: 'task not found' });
          } else {
            res.status(httpStatus.OK).json({ task });
          }
        })
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `error to get task - ${err.message}` }));
    })
    .put(async (req, res) => {
      Tasks.update(req.body, { where: req.params })
        .then(() => res.sendStatus(httpStatus.NO_CONTENT))
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `error to update task - ${err.message}` }));
    })
    .delete(async (req, res) => {
      Tasks.destroy({ where: req.params })
        .then(() => res.sendStatus(httpStatus.NO_CONTENT))
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `error to delete task - ${err.message}` }));
    });
};
