import * as httpStatus from 'http-status';
import { defaultResponse, errorResponse } from '../libs/response';

module.exports = (app) => {
  const Tasks = app.get('db').models.Tasks;

  function getAllTasks() {
    return new Promise((resolve, reject) => {
      Tasks.findAll({})
        .then((tasks) => {
          resolve(defaultResponse({ tasks }));
        })
        .catch(err => reject(errorResponse(
          {
            message: `error to get the task - ${err.message}`,
          }, httpStatus.PRECONDITION_FAILED,
        )));
    });
  }

  function insertTask(taskData) {
    return new Promise((resolve, reject) => {
      Tasks.create(taskData)
        .then(task => resolve(defaultResponse({ task })))
        .catch(err => reject(errorResponse(
          {
            message: `error to create task - ${err.message}`,
          }, httpStatus.PRECONDITION_FAILED,
        )));
    });
  }

  function getTaskById(taskId) {
    return new Promise((resolve, reject) => {
      Tasks.findOne({ where: { id: taskId } })
        .then((task) => {
          if (!task) {
            resolve(errorResponse({ message: 'task not found' }, httpStatus.NOT_FOUND));
          } else {
            resolve(defaultResponse({ task }));
          }
        })
        .catch(err => reject(errorResponse(
          {
            message: `error to get task - ${err.message}`,
          }, httpStatus.PRECONDITION_FAILED,
        )));
    });
  }

  function updateTask(taskData, taskId) {
    return new Promise((resolve, reject) => {
      Tasks.update(taskData, { where: { id: taskId } })
        .then(() => resolve(defaultResponse('', httpStatus.NO_CONTENT)))
        .catch(err => reject(errorResponse(
          {
            message: `error to update task - ${err.message}`,
          }, 412,
        )));
    });
  }

  function deleteTask(taskId) {
    return new Promise((resolve, reject) => {
      Tasks.destroy({ where: { id: taskId } })
        .then(() => resolve(defaultResponse('', httpStatus.NO_CONTENT)))
        .catch(err => reject(errorResponse(
          {
            message: `error to delete task - ${err.message}`,
          }, httpStatus.PRECONDITION_FAILED,
        )));
    });
  }

  return {
    getAllTasks,
    insertTask,
    getTaskById,
    updateTask,
    deleteTask,
  };
};
