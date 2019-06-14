import UsersService from '../services/users.service';

module.exports = (app) => {
  const usersService = UsersService(app);

  function authenticateUser(req, res) {
    try {
      usersService.authenticateUser(req.body)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(err => res.status(err.statusCode).json(err.data));
    } catch (error) {
      res.status(400).json(`error to process request - ${error.message}`);
    }
  }

  function getAllUsers(req, res) {
    try {
      usersService.getAllUser()
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(err => res.status(err.statusCode).json(err.data));
    } catch (error) {
      res.status(400).json(`error to process request - ${error.message}`);
    }
  }

  function insertUser(req, res) {
    try {
      usersService.insertUser(req.body)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(err => res.status(err.statusCode).json(err.data));
    } catch (error) {
      res.status(400).json(`error to process request - ${error.message}`);
    }
  }

  function findUserById(req, res) {
    try {
      usersService.findUserById(req.user.id)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(err => res.status(err.statusCode).json(err.data));
    } catch (error) {
      res.status(400).json(`error to process request - ${error.message}`);
    }
  }

  function updateUser(req, res) {
    try {
      usersService.updateUser(req.body, req.user.id)
        .then((response) => {
          res.sendStatus(response.statusCode);
        })
        .catch((err) => {
          res.status(err.statusCode).json(err.data);
        });
    } catch (error) {
      res.status(400).json(`error to process request - ${error.message}`);
    }
  }

  function deleteUser(req, res) {
    try {
      usersService.deleteUser(req.user.id)
        .then((response) => {
          res.sendStatus(response.statusCode);
        })
        .catch((err) => {
          res.status(err.statusCode).json(err.data);
        });
    } catch (error) {
      res.status(400).json(`error to process request - ${error.message}`);
    }
  }

  return {
    authenticateUser,
    getAllUsers,
    insertUser,
    findUserById,
    updateUser,
    deleteUser,
  };
};
