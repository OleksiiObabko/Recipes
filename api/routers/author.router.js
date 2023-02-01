const router = require("express").Router();

const {authorController} = require("../controllers");
const {authorMiddleware, authMiddleware} = require("../middlewares");

router.get(
	"/",
	authorController.getByParams
);
router.post(
	"/",
	authorMiddleware.isBodyCreateValid,
	authorMiddleware.isFieldUniqueDynamically("userName", "author"),
	authorMiddleware.isFieldUniqueDynamically("email", "author"),
	authorController.create
);
router.delete(
	"/",
	authMiddleware.checkAccessToken,
	authorController.delete
);

router.patch(
	"/subscribe/:authorId",
	authorMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorMiddleware.checkBanStatus,
	authorMiddleware.isSubscribed,
	authorController.subscribe
);

router.patch(
	"/unsubscribe/:authorId",
	authorMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorMiddleware.checkBanStatus,
	authorMiddleware.isUnSubscribed,
	authorController.unSubscribe
);

router.patch(
	"/userName",
	authMiddleware.checkAccessToken,
	authorMiddleware.isUpdateUserNameValid,
	authorMiddleware.isFieldUniqueDynamically("userName"),
	authorController.changeUserName
);

router.patch(
	"/block/:authorId",
	authorMiddleware.isBlockTimeValid,
	authorMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorMiddleware.isBlockAuthorNotAdmin,
	authorController.block
);

module.exports = router;
