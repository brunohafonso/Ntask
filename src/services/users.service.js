const httpStatus = require('http-status');
const { generateToken } = require('../libs/token');
const { defaultResponse, errorResponse } = require('../libs/response');

module.exports = (app) => {
  const Users = app.get('db').models.Users;

  function authenticateUser(userData) {
    return new Promise(((resolve, reject) => {
      try {
        if (!userData) {
          return resolve(errorResponse({ message: 'you must inform the user data correctly' }));
        }

        if (!userData.email || !userData.password) {
          return resolve(errorResponse({ message: 'You need to inform the credentials correctly' }));
        }

        const { email, password } = userData;
        Users.findOne({ where: { email } })
          .then(async (user) => {
            if (!user) {
              return resolve(errorResponse({ message: 'user not found' }, httpStatus.NOT_FOUND));
            }

            if (await Users.isPassword(password, user.password)) {
              return resolve(defaultResponse({
                success: true,
                token: await generateToken({ id: user.id, email: user.email }),
              }));
            }

            return resolve(defaultResponse({
              success: false,
              message: 'User or password incorrect',
            }));
          }).catch(err => reject(errorResponse(
            {
              success: false,
              message: `error to authenticate user - ${err.message}`,
            },
          )));
      } catch (error) {
        return reject(errorResponse(
          {
            success: false,
            message: `error to authenticate user - ${error.message}`,
          },
        ));
      }
    }));
  }

  function getAllUsers() {
    return new Promise((resolve, reject) => {
      Users.findAll({ attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'] })
        .then(users => resolve(defaultResponse({ users }))
          .catch(err => reject(errorResponse(
            {
              message: `Error to get users - ${err.message}`,
            }, httpStatus.PRECONDITION_FAILED,
          ))));
    });
  }

  function insertUser(userData) {
    return new Promise((resolve, reject) => {
      Users.create(userData)
        .then(user => resolve(defaultResponse({ user }, httpStatus.CREATED)))
        .catch(err => reject(errorResponse(
          {
            message: `Error to create user - ${err.message}`,
          }, httpStatus.PRECONDITION_FAILED,
        )));
    });
  }

  function findUserById(userId) {
    return new Promise((resolve, reject) => {
      Users.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      })
        .then((user) => {
          if (!user) {
            resolve(errorResponse({ message: 'user not found' }, httpStatus.NOT_FOUND));
          } else {
            resolve(defaultResponse({ user }));
          }
        })
        .catch(err => reject(errorResponse(
          {
            message: `Error to get user - ${err.message}`,
          }, httpStatus.PRECONDITION_FAILED,
        )));
    });
  }

  function updateUser(userData, userId) {
    return new Promise((resolve, reject) => {
      Users.update(userData, { where: { id: userId } })
        .then(() => resolve(defaultResponse('', httpStatus.NO_CONTENT)))
        .catch(err => reject(errorResponse(
          {
            message: `Error to update user - ${err.message}`,
          }, httpStatus.PRECONDITION_FAILED,
        )));
    });
  }

  function deleteUser(userId) {
    return new Promise((resolve, reject) => {
      Users.destroy({ where: { id: userId } })
        .then(() => resolve(defaultResponse('', httpStatus.NO_CONTENT)))
        .catch(err => reject((
          {
            message: `Error to delete user - ${err.message}`,
          }, httpStatus.PRECONDITION_FAILED)));
    });
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
