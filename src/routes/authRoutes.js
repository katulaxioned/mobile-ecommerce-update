const router = require('express').Router();
const dependencies = require('./routesDependencies').default;


/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags:
 *      - Authentication
 *    name: Local Login API
 *    summary: Based on user's data, this api sent jwt token which leads to login process.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: Body Data
 *        in: body
 *        schema:
 *         type: object
 *         properties:
 *          email: 
 *            type: string
 *          password:
 *            type: string
 *        required:
 *         - email
 *         - password
 *    responses:
 *      200:
 *        description: JWT token will be in response.
 *      500:
 *        description: Internal server error.
 */
router.post('/login', dependencies.authClient.login);

/**
 * @note All routes regarding local signup OR using Oauth sign-in should be listed below. 
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    tags:
 *      - Authentication
 *    name: Local Register API
 *    summary: Based on user's data, this api register a user which leads to register process.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: Body Data
 *        in: body
 *        schema:
 *         type: object
 *         properties:
 *          email: 
 *            type: string
 *          password:
 *            type: string
 *        required:
 *         - email
 *         - password
 *    responses:
 *      200:
 *        description: Success true and a user will be in response.
 *      409:
 *        description: Duplicate user error.
 *      500:
 *        description: Internal server error.
 */
 router.post("/register", dependencies.authClient.register);

module.exports = router;
