const authService = require('../services/authServices');
const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');

const User = require("../models/user");

/**
 * @description Local register controller.
 * @function register
 */
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ email: email });
    // check for user exists or not.
    if (result) {
      return res.status(409).json(utils.responseMsg(errorMsg.duplicateDataProvided));
    }
    const newUser = new User({
      email: email,
      password: password
    });
    newUser.save(err => {
      if (err) return res.status(500).json(utils.responseMsg(errorMsg.internalServerError));
    });
    return res.status(200).json(utils.responseMsg(null, true, newUser));
  } catch (err) {
    console.error('error', error.stack);
    return res.status(500).json(utils.responseMsg(errorMsg.internalServerError))
  }
}

/**
 * @description Local login controller.
 * @function login
 */
exports.login = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;
    
    //Please replace dummy payload with your actual object for creating token.
    let message = {
      'msg': 'Login Successful.',
      'token': authService.createToken({email, password})
    };
    res.send(utils.responseMsg(null, true, message));
  } catch (error) {
    console.error('error', error.stack);
    res.status(500).send(utils.responseMsg(errorMsg.internalServerError));
  }
};
