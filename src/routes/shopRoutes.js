const router = require('express').Router();
const dependencies = require('./routesDependencies').default;

/**
 * @swagger
 * /shop/mobiles:
 *  get:
 *    tags:
 *      - Mobile store
 *    name: Local Mobiles API
 *    summary: This api shows all mobiles in store.
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Success true and a mobile data will be in response.
 *      500:
 *        description: Internal server error.
 */
router.get('/mobiles', dependencies.shopClient.showAllMobiles);

module.exports = router;
