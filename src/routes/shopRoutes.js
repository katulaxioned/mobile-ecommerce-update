const router = require('express').Router();
const dependencies = require('./routesDependencies').default;

/**
 * @swagger
 * /api/shop/mobiles:
 *  get:
 *    tags:
 *      - Mobile store
 *    name: Local Mobiles API
 *    summary: Based on user's data, this api shows mobiles depending upon user request.
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Success true and a mobile data will be in response.
 *      500:
 *        description: Internal server error.
 */
 router.get("/mobiles", dependencies.shopClient.showAllMobiles);

module.exports = router;
