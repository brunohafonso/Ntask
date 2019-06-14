import tasks from './tasks.route';
import users from './users.route';

module.exports = (app) => {
  tasks(app);
  users(app);
};
