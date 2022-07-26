const router = require('express').Router();
const shopRoutes = require('./shopRoutes');
const adminEditorRoutes = require('./adminEditorRoutes');
const authRoutes = require('./authRoutes');
const passport = require('passport');
const dependencies = require('./routesDependencies').default;

/**
 * @swagger
 * /health:
 *  get:
 *    tags:
 *      - Server Health Check 
 *    name: Server Health Check
 *    summary: This is api to check server health.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: successfully send.
 *      500:
 *        description: Internal server error.
 */
router.get('/health', dependencies.serverHealth.checkHealth);

router.use('/shop', shopRoutes);
router.use('/admin', passport.authenticate('jwt', { session : false }), adminEditorRoutes);
router.use('/auth', authRoutes);

module.exports = router;
