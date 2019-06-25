const tasks = require('./tasks.route');
const users = require('./users.route');

module.exports = (app) => {
  tasks(app);
  users(app);
};
