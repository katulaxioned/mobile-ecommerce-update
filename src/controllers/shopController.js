const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');

const Mobile = require('../models/mobile');

/**
 * @description Local controller to show all mobiles.
 * @function showAllMobiles
 */
exports.showAllMobiles = async (req, res, next) => {
    try {
        const result = await Mobile.find();
        return res.status(200).send(utils.responseMsg(null, true, result));
    } catch (err) {
        return res.status(500).send(utils.responseMsg(err));
    }
}