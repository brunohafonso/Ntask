import tasks from './tasks';
import users from './users';

module.exports = (app) => {
  tasks(app);
  users(app);
};
