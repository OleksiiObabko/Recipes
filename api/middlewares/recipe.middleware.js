const {ApiError} = require("../errors");
const {recipeValidator} = require("../validators");
const {recipeRepository} = require("../repositories");

module.exports = {
	checkCreator: async (req, res, next) => {
		try {
			const {recipe, tokenInfo} = req;

			if (!recipe.creator._id.equals(tokenInfo.author._id)) {
				throw new ApiError("that recipe not yours", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyCreateValid: (req, res, next) => {
		try {
			const validatedBody = recipeValidator.createRecipeValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.recipe = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyUpdateValid: (req, res, next) => {
		try {
			const validatedBody = recipeValidator.updateRecipeValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.updateRecipe = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isModerated: (req, res, next) => {
		try {
			const {isModerated} = req.recipe;

			if (isModerated) {
				throw new ApiError("this recipe already moderated", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isRecipeExistsDynamically: (fieldName, from = "body", dbField = fieldName) => async (req, res, next) => {
		try {
			const fieldToSearch = req[from][fieldName];

			const recipe = await recipeRepository.getOneByParams({[dbField]: fieldToSearch});

			if (!recipe) {
				throw new ApiError(`recipe width ${dbField} ${fieldToSearch} not found`, 400);
			}

			req.recipe = recipe;
			next();
		} catch (e) {
			next(e);
		}
	}
};
