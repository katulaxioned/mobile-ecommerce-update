const router = require('express').Router();
const dependencies = require('./routesDependencies').default;
const checkRole = require('../middlewares/authrole');

/**
 * @swagger
 * /admin-editor/add-mobile:
 *  post:
 *    tags:
 *      - Authorization actions
 *    name: Local API for adding mobile
 *    summary: Based on user's mobile data, this api add mobiles to database.
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
 *          brand: 
 *            type: string
 *          device:
 *            type: string
 *          price:
 *            type: number
 *          quantity:
 *            type: number
 *        required:
 *         - brand
 *         - device
 *         - price
 *         - quantity
 *    responses:
 *      201:
 *        description: Success true and a newly created mobile data will be in response.
 *      500:
 *        description: Internal server error.
 */
router.post('/add-mobile', checkRole(['admin', 'superadmin']), dependencies.adminClient.addMobile);
router.patch('/update-mobile/:id', checkRole(['admin', 'superadmin']), dependencies.adminClient.updateMobile);
router.delete('/delete-mobile/:id', checkRole(['admin', 'superadmin']), dependencies.adminClient.deleteMobile);

module.exports = router;
