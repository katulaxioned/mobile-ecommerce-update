const authService = require('../services/authServices');
const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');
const Joi = require('joi');

const User = require('../models/user');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(18).required(),
  role: Joi.string().valid('employee','admin','superadmin').required(),
});

const options = { abortEarly : false };

/**
 * @description Local register controller.
 * @function register
 */
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const data = { email, password, role};
    const validationResult = utils.validateProvidedData(registerSchema, data, options);
    if (validationResult) {
      return res.status(422).send(utils.responseMsg(validationResult));
    }
    const result = await User.findOne({ email: email });
    // check for user exists or not.
    if (result) {
      return res
        .status(409)
        .send(utils.responseMsg(errorMsg.duplicateUserProvided));
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
          .send(utils.responseMsg(errorMsg.dbError));
    });
    return res.status(200).send(utils.responseMsg(null, true, newUser));
  } catch (error) {
    console.error('error', error.stack);
    return res
      .status(500)
      .send(utils.responseMsg(error));
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(18).required()
});

/**
 * @description Local login controller.
 * @function login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = { email, password };
    const validationResult = utils.validateProvidedData(loginSchema, data, options);
    if (validationResult) {
      return res.status(422).send(utils.responseMsg(validationResult));
    }
    const validUser = await User.findOne({ email: email });

    if (!validUser) {
      return res.status(500).send(utils.responseMsg(errorMsg.noUserExist));
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
      return res.status(200).send(utils.responseMsg(null, true, message));
    }

    return res
      .status(403)
      .send(utils.responseMsg('Invalid Login credentials'));
    //Please replace dummy payload with your actual object for creating token.
  } catch (error) {
    console.error('error', error.stack);
    return res
      .status(500)
      .send(utils.responseMsg(error));
  }
};
