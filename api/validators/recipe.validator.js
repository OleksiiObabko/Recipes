const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createRecipeValidator: Joi.object({
		title: Joi.string().trim().required().lowercase(),
		time: Joi.number().min(1).max(500).required(),
		servings: Joi.number().min(1).max(50).required(),
		description: Joi.string().min(10).max(300).required(),
		category: Joi.string().regex(regex.MONGO_ID).required(),
		kitchen: Joi.string().regex(regex.MONGO_ID).required(),
		ingredients: Joi.array().items(Joi.string().min(3).max(20)).min(1).required(),
		gallery: Joi.array().items(Joi.string().regex(regex.MONGO_ID)).optional().default([]),
		stages: Joi.array().items(Joi.string().regex(regex.MONGO_ID)).min(1).max(40).required(),
		rating: Joi.number().min(0).max(5).default(0),
		bookCount: Joi.number().min(0).default(0),
		reviews: Joi.array().items(Joi.string().regex(regex.MONGO_ID)).optional().default([]),
		creator: Joi.string().regex(regex.MONGO_ID).optional(),
		isModerated: Joi.boolean().default(false)
	})
};