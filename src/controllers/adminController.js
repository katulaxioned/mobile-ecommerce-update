const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');

const Mobile = require('../models/mobile');

exports.addMobile = (req, res, next) => {
	try {
		const { brand, device, price, quantity } = req.body;
		console.log(req.body)
		const newMobile = new Mobile({
			brand: brand,
			device: device,
			price: price,
			quantity: quantity,
		});
		newMobile.save((err, data) => {
			if (err) {
				return res.status(500).json(utils.responseMsg(errorMsg.internalServerError));
			} else {
				return res.status(201).json(utils.responseMsg(null, true, newMobile));
			}
		});
	} catch (err) {
		return res.status(500).json(utils.responseMsg(errorMsg.internalServerError));
	}
}

exports.updateMobile = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { brand, device, price, quantity } = req.body;
		const newMobile = {};

		newMobile.brand = brand;
		newMobile.device = device;
		newMobile.price = price;
		newMobile.quantity = quantity;
		let result = await Mobile.findOneAndUpdate({ _id: id }, newMobile, { new: true, runValidators: true });
		if (!result) {
			return res.status(500).json(utils.responseMsg(errorMsg.internalServerError));
		}
		return res.status(200).json(utils.responseMsg(null, true, result));
	} catch (err) {
		return res.status(500).json(utils.responseMsg(errorMsg.internalServerError));
	}
}

exports.deleteMobile = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await Mobile.deleteOne({ _id: id })
		if (result.deletedCount) {
			return res.status(200).json(utils.responseMsg(null, true, result));
		}
		return res.status(500).json(utils.responseMsg(errorMsg.internalServerError));
	} catch (error) {
		return res.status(500).json(utils.responseMsg(errorMsg.internalServerError));
	}
}