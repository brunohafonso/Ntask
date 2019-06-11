import * as httpStatus from 'http-status';
import { generateToken } from '../libs/token';
import authMiddleware from '../middlewares/auth';

module.exports = (app) => {
  const Users = app.database.db.models.Users;
  /**
 * @swagger
 *  tags:
 *    - name: "Users"
 *      description: "Endpoints of the users"
 *
 * definitions:
 *   userDataAuth:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *
 *   loginObject:
 *      type: object
 *      required:
 *        - success
 *        - token
 *      properties:
 *        success:
 *          type: boolean
 *        token:
 *          type: string
 *
 *   errorMessage:
 *     type: object
 *     required:
 *       - message
 *     properties:
 *       message:
 *         type: string
 *
 */


  /**
 * @swagger
 *
 * /login:
 *   post:
 *     tags:
 *        - Users
 *     summary: Login user to the application
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userDataAuth
 *         description: User credentials
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/userDataAuth'
 *     responses:
 *       200:
 *         description: Login with success
 *         content:
 *            application/json:
 *                schema:
 *                    $ref: '#/definitions/loginObject'
 *       404:
 *          description: user not found on database with email informed
 *          content:
 *            application/json:
 *                schema:
 *                    $ref: '#/definitions/errorMessage'
 */
  app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body;
      Users.findOne({ where: { email } })
        .then(async (user) => {
          if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'user not found' });
          }

          if (await Users.isPassword(password, user.password)) {
            return res.status(httpStatus.OK).json({
              success: true,
              token: await generateToken({ id: user.id, email: user.email }),
            });
          }

          return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'User or password incorrect',
          });
        })
        .catch(err => res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: `error to authenticate user - ${err.message}`,
        }));
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'You need to inform the credentials correctly' });
    }
    return true;
  });

  app.route('/users')
    .get(async (req, res) => {
      Users.findAll({
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      })
        .then(users => res.status(httpStatus.OK).json({ users }))
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `Error to get users - ${err.message}` }));
    })
    .post(async (req, res) => {
      Users.create(req.body)
        .then(user => res.status(httpStatus.CREATED).json({ user }))
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `Error to create user - ${err.message}` }));
    });

  app.route('/user')
    .all(authMiddleware)
    .get(async (req, res) => {
      Users.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      })
        .then((user) => {
          if (!user) {
            res.status(httpStatus.NOT_FOUND).json({ message: 'user not found' });
          } else {
            res.status(httpStatus.OK).json({ user });
          }
        })
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `Error to get user - ${err.message}` }));
    })
    .put(async (req, res) => {
      Users.update(req.body, { where: { id: req.user.id } })
        .then(() => res.sendStatus(httpStatus.NO_CONTENT))
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `Error to update user - ${err.message}` }));
    })
    .delete(async (req, res) => {
      Users.destroy({ where: { id: req.user.id } })
        .then(() => res.sendStatus(httpStatus.NO_CONTENT))
        .catch(err => res.status(httpStatus.PRECONDITION_FAILED).json({ message: `Error to delete user - ${err.message}` }));
    });
};
