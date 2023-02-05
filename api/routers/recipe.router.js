const router = require("express").Router();

const {authMiddleware, recipeMiddleware, authorMiddleware, reviewMiddleware} = require("../middlewares");
const {recipeController} = require("../controllers");

router.get(
	"/",
	recipeController.getByQuery
);
router.post(
	"/",
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isBodyCreateValid,
	recipeController.create
);

router.get(
	"/:recipeId",
	authMiddleware.isMongoIdValid("recipeId"),
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeController.getById
);
router.put(
	"/:recipeId",
	authMiddleware.checkAccessToken,
	authMiddleware.isMongoIdValid("recipeId"),
	recipeMiddleware.isBodyUpdateValid,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeMiddleware.checkCreator,
	recipeController.update
);
router.delete(
	"/:recipeId",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	authorMiddleware.checkBanStatus,
	recipeMiddleware.checkCreator,
	recipeController.delete
);

router.post(
	"/:recipeId/addReview",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	reviewMiddleware.isBodyCreateValid,
	recipeController.addReview
);
router.delete(
	"/:recipeId/removeReview/:reviewId",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.isMongoIdValid("reviewId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	reviewMiddleware.isReviewExistsDynamically("reviewId", "params", "_id"),
	reviewMiddleware.checkOwner,
	recipeController.deleteReview
);

router.patch(
	"/:recipeId/moderation",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeMiddleware.isModerated,
	recipeController.moderate
);

module.exports = router;
