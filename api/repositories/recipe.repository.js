const {Recipe} = require("../dataBases");

module.exports = {
	getByQuery: async (query) => {
		const {page = 1, title, category, kitchen, ingredients, sort = "rating", sortType = 1} = query;

		const limit = 5;
		let findObj = {};
		let findByIngredients = [];

		if (title) {
			findObj = {
				...findObj,
				title: new RegExp(title)
			};
		}
		if (category) {
			findObj = {
				...findObj,
				"category.title": new RegExp(category)
			};
		}
		if (kitchen) {
			findObj = {
				...findObj,
				"kitchen.title": new RegExp(kitchen)
			};
		}
		if (ingredients) {
			const findIngredients = ingredients.split(",");
			for (const findIngredient of findIngredients) {
				findByIngredients.push({ingredients: new RegExp(findIngredient)});
			}
			findObj = {
				...findObj,
				$and: findByIngredients
			};
		}

		const recipes = await Recipe.aggregate([
			{
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "category"
				}
			},
			{
				$lookup: {
					from: "kitchens",
					localField: "kitchen",
					foreignField: "_id",
					as: "kitchen"
				}
			},
			{
				$lookup: {
					from: "stages",
					localField: "stages",
					foreignField: "_id",
					as: "stages"
				}
			},
			{
				$lookup: {
					from: "reviews",
					localField: "reviews",
					foreignField: "_id",
					as: "reviews"
				}
			},
			{
				$lookup: {
					from: "authors",
					localField: "creator",
					foreignField: "_id",
					as: "creator"
				}
			},
			{
				$unwind: "$category"
			},
			{
				$unwind: "$kitchen"
			},
			{
				$unwind: "$creator"
			},
			{
				$project: {
					title: 1,
					time: 1,
					servings: 1,
					descriptions: 1,
					category: {
						title: 1
					},
					kitchen: {
						title: 1
					},
					ingredients: 1,
					gallery: 1,
					stages: {
						number: 1,
						photo: 1,
						description: 1
					},
					rating: 1,
					bookCount: 1,
					reviews: 1,
					creator: {
						userName: 1,
						avatar: 1
					},
					isModerated: 1,
					createdAt: 1,
					updatedAt: 1
				}
			},
			{
				$match: findObj
			},
			{
				$skip: (+page - 1) * limit
			},
			{
				$limit: limit
			}
		]);
		const count = await Recipe.count(findObj);

		return {
			recipes,
			page,
			count
		};
	},
	create: async (newRecipe) => Recipe.create(newRecipe)
};
