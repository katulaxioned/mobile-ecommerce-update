const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');
const Joi = require('joi');
const { errorMessages } = require('../helpers/errorMessage');

const mongoose = require('mongoose');
const Mobile = require('../models/mobile');

const mobileSchema = Joi.object({
  brand: Joi.string().max(10).required(),
  device: Joi.string().max(12).required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().positive().required()
});

const options = { abortEarly : false };

exports.addMobile = (req, res) => {
  try {
    const { brand, device, price, quantity } = req.body;
    const data = { brand, device, price, quantity };
    const validationResult = utils.validateProvidedData(mobileSchema, data, options);
    if (validationResult) {
      return res.status(422).send(utils.responseMsg(validationResult));
    };
    const newMobile = new Mobile({
      brand: brand,
      device: device,
      price: price,
      quantity: quantity,
    });
    newMobile.save((err) => {
      if (err) {
        return res
          .status(500)
          .send(utils.responseMsg(errorMsg.dbError));
      } else {
        return res.status(201).send(utils.responseMsg(null, true, newMobile));
      }
    });
  } catch (err) {
    return res
      .status(500)
      .send(utils.responseMsg(err));
  }
};

exports.updateMobile = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, device, price, quantity } = req.body;
    // validation start
    const data = { brand, device, price, quantity };
    const validationResult = utils.validateProvidedData(mobileSchema, data, options);
    if (validationResult) {
      return res.status(422).send(utils.responseMsg(validationResult));
    };
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(404).send(utils.responseMsg(errorMessages.idNotValid));
    }
    const hasProduct = await Mobile.find({ _id: id });
    if (!hasProduct.length) {
      return res.status(404).send(utils.responseMsg(errorMessages.productNotFound));
    }
    const newMobile = {
      brand: brand,
      device: device,
      price: price,
      quantity: quantity
    };
    let result = await Mobile.findOneAndUpdate({ _id: id }, newMobile, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res
        .status(500)
        .send(utils.responseMsg(errorMsg.dbError));
    }
    return res.status(200).send(utils.responseMsg(null, true, result));
  } catch (err) {
    return res
      .status(500)
      .send(utils.responseMsg(err));
  }
};

exports.deleteMobile = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(404).send(utils.responseMsg(errorMessages.idNotValid));
    }
    const hasProduct = await Mobile.find({ _id: id });
    if (!hasProduct.length) {
      return res.status(404).send(utils.responseMsg(errorMessages.productNotFound));
    }
    const result = await Mobile.deleteOne({ _id: id });
    if (result.deletedCount) {
      return res.status(200).send(utils.responseMsg(null, true, result));
    }
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.dbError));
  } catch (error) {
    return res
      .status(500)
      .send(utils.responseMsg(error));
  }
};
