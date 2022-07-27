const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');

const Mobile = require('../models/mobile');

exports.addMobile = (req, res) => {
  try {
    const { brand, device, price, quantity } = req.body;
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
