const errorMsg = require('../helpers/errorMessage').errorMessages;
const { responseMsg } = require('../helpers/utils');

const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).send(responseMsg(errorMsg.notAllowed))
    : next();

module.exports = checkRole;
