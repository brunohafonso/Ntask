import authMiddleware from '../middlewares/auth';
import UsersController from '../controllers/users.controller';

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

  /**
     * @swagger
     *
     * /user:
     *   put:
     *     security:
     *        - bearerAuth: []
     *     tags:
     *        - Users
     *     summary: update the authenticated user
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

  const usersController = UsersController(app);

  app.post('/login', usersController.authenticateUser);

  app.route('/users')
    .get(authMiddleware, usersController.getAllUsers)
    .post(usersController.insertUser);

  app.route('/user')
    .all(authMiddleware)
    .get(usersController.findUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);
};
