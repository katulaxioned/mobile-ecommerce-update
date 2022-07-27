const authService = require('../services/authServices');
const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');
const Joi = require('joi');

const User = require('../models/user');

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(18).required(),
  role: Joi.string().valid('employee','admin','superadmin').required()
});

const options = { abortEarly : false };

/**
 * @description Local register controller.
 * @function register
 */
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let data = { email, password}
    const { error: { details: err } } = authSchema.validate(data, options);
    return res.send(err); 
    // tommarow start remaing impliment from here.
    const result = await User.findOne({ email: email });
    // check for user exists or not.
    if (result) {
      return res
        .status(409)
        .json(utils.responseMsg(errorMsg.duplicateDataProvided));
    }
    const newUser = new User({
      email: email,
      password: password,
      role: role,
    });
    newUser.save((err) => {
      if (err)
        return res
          .status(500)
          .json(utils.responseMsg(errorMsg.dbError));
    });
    return res.status(200).json(utils.responseMsg(null, true, newUser));
  } catch (error) {
    console.error('error', error.stack);
    return res
      .status(500)
      .json(utils.responseMsg(error));
  }
};

/**
 * @description Local login controller.
 * @function login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email: email });

    if (!validUser) {
      return res.status(500).json(utils.responseMsg(errorMsg.noUserExist));
    }

    if (validUser.password === password) {
      let message = {
        msg: 'Login Successful.',
        token: authService.createToken({
          email,
          password,
          role: validUser.role,
        }),
      };
      return res.status(200).json(utils.responseMsg(null, true, message));
    }

    return res
      .status(403)
      .json(utils.responseMsg('Invalid Login credentials'));
    //Please replace dummy payload with your actual object for creating token.
  } catch (error) {
    console.error('error', error.stack);
    return res
      .status(500)
      .json(utils.responseMsg(error));
  }
};
