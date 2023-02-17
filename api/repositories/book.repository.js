const {Book} = require("../dataBases");

module.exports = {
	create: (recipeId, authorId) => Book.create({recipe: recipeId, author: authorId}),
	deleteOne: (recipeId, authorId) => Book.deleteOne({recipe: recipeId, author: authorId}),
	findOne: (recipeId, authorId) => Book
	.findOne({recipe: recipeId, author: authorId})
	.populate("recipe")
	.lean(),
	findByAuthorId: (authorId) => Book
	.find({author: authorId})
	.populate({
		path: "recipe",
		populate: {
			path: "category kitchen gallery stages",
			select: "title number photo description",
			populate: {
				strictPopulate: false,
				path: "photo",
				select: "-_id path"
			}
		}
	})
	.transform(res => res.map(item => item.recipe))
	.lean()
};