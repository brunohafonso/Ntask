import authMiddleware from '../middlewares/auth';
import UsersController from '../controllers/users';

module.exports = (app) => {
  /**
   * @swagger
   *  tags:
   *    - name: "Users"
   *      description: "Endpoints of the users"
   *
   * definitions:
   *   userDataAuth:
   *     type: object
   *     properties:
   *       email:
   *         type: string
   *       password:
   *         type: string
   *         format: password
   *
   *   loginObject:
   *      type: object
   *      properties:
   *        success:
   *          type: boolean
   *        token:
   *          type: string
   *
   *   user:
   *    type: object
   *    properties:
   *      id:
   *        type: integer
   *      name:
   *        type: string
   *      email:
   *        type: string
   *      createAt:
   *        type: date-time
   *      updatedAt:
   *        type: date-time
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
   *    post:
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
  const usersController = UsersController(app);

  app.post('/login', async (req, res) => {
    usersController.authenticateUser(req.body)
      .then((response) => {
        res.status(response.statusCode).json(response.data);
      })
      .catch((err) => {
        res.status(err.statusCode).json(err.data);
      });
  });

  app.route('/users')
    /**
     * @swagger
     *
     * /users:
     *   get:
     *     security:
     *        - bearerAuth: []
     *     tags:
     *        - Users
     *     summary: List all users
     *     description: return a list of users
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: Authorization
     *          description: Bearer token to allow the requests
     *          in: header
     *          required: true
     *          type: api_key
     *     responses:
     *       200:
     *         description: return a list of users
     *         content:
     *            application/json:
     *                schema:
     *                  type: object
     *                  properties:
     *                    users:
     *                      type: array
     *                      items:
     *                        $ref: '#/definitions/user'
     *       401:
     *         description: user not authenticated
     *         content:
     *            application/json:
     *                schema:
     *                  type: object
     *                  properties:
     *                    errorMessage:
     *                      type: string
    */
    .get(authMiddleware, async (req, res) => {
      usersController.getAllUser()
        .then((response) => {
          res.status(response.statusCode).json(response.data);
        })
        .catch((err) => {
          res.status(err.statusCode).json(err.data);
        });
    })
    /**
     * @swagger
     *
     * /users:
     *   post:
     *     tags:
     *        - Users
     *     summary: create a new user
     *     description: return the new user
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: userData
     *          description: the data to create a new user
     *          in: body
     *          required: true
     *          schema:
     *            type: object
     *            properties:
     *              name:
     *                type: string
     *              email:
     *                type: string
     *              password:
     *                type: string
     *
     *
     *     responses:
     *       200:
     *         description: return a list of users
     *         content:
     *            application/json:
     *                schema:
     *                  type: object
     *                  properties:
     *                    users:
     *                      type: array
     *                      items:
     *                        $ref: '#/definitions/user'
     *       401:
     *         description: user not authenticated
     *         content:
     *            application/json:
     *                schema:
     *                  type: object
     *                  properties:
     *                    errorMessage:
     *                      type: string
    */
    .post(async (req, res) => {
      usersController.insertUser(req.body)
        .then((response) => {
          res.status(response.statusCode).json(response.data);
        })
        .catch((err) => {
          res.status(err.statusCode).json(err.data);
        });
    });

  app.route('/user')
    .all(authMiddleware)
    /**
     * @swagger
     *
     * /user:
     *   get:
     *     security:
     *        - bearerAuth: []
     *     tags:
     *        - Users
     *     summary: get the authenticated user
     *     description: return the authenticated user
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: Authorization
     *          description: Bearer token to allow the requests
     *          in: header
     *          required: true
     *          type: api_key
     *
     *     responses:
     *       200:
     *         description: return a list of users
     *         content:
     *            application/json:
     *                schema:
     *                  type: object
     *                  properties:
     *                    users:
     *                      type: array
     *                      items:
     *                        $ref: '#/definitions/user'
     *       401:
     *         description: user not authenticated
     *         content:
     *            application/json:
     *                schema:
     *                  type: object
     *                  properties:
     *                    errorMessage:
     *                      type: string
    */
    .get(async (req, res) => {
      usersController.findUserById(req.user.id)
        .then((response) => {
          res.status(response.statusCode).json(response.data);
        })
        .catch((err) => {
          res.status(err.statusCode).json(err.data);
        });
    })
    /**
     * @swagger
     *
     * /user:
     *   put:
     *     security:
     *        - bearerAuth: []
     *     tags:
     *        - Users
     *     summary: get the authenticated user
     *     description: return the authenticated user
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: Authorization
     *          description: Bearer token to allow the requests
     *          in: header
     *          required: true
     *          type: api_key
     *
     *     responses:
     *       204:
     *         description: return just the status code 204
     *         content:
     *            application/json:
     *
     *       401:
     *         description: user not authenticated
     *         content:
     *            application/json:
     *                schema:
     *                  type: object
     *                  properties:
     *                    errorMessage:
     *                      type: string
    */
    .put(async (req, res) => {
      usersController.updateUser(req.body, req.user.id)
        .then((response) => {
          res.sendStatus(response.statusCode);
        })
        .catch((err) => {
          res.status(err.statusCode).json(err.data);
        });
    })
    /**
     * @swagger
     *
     * /user:
     *   delete:
     *     security:
     *        - bearerAuth: []
     *     tags:
     *        - Users
     *     summary: delete the authenticated user
     *     description: return just the status code 204
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: Authorization
     *          description: Bearer token to allow the requests
     *          in: header
     *          required: true
     *          type: api_key
     *
     *     responses:
     *       204:
     *         description: return a list of users
     *         content:
     *            application/json:
     *
     *       401:
     *         description: user not authenticated
     *         content:
     *            application/json:
     *                schema:
     *                  type: object
     *                  properties:
     *                    errorMessage:
     *                      type: string
    */
    .delete(async (req, res) => {
      usersController.deleteUser(req.user.id)
        .then((response) => {
          res.sendStatus(response.statusCode);
        })
        .catch((err) => {
          res.status(err.statusCode).json(err.data);
        });
    });
};
