const asyncHandler = require('express-async-handler')
const Product=require('../model/productModel')
// @desc  search product
// @route GET/api/searchProduct
// @access public
const searchProduct=asyncHandler(async(req,res)=>{
		const page = parseInt(req.query.page) - 1 || 0
		const limit = parseInt(req.query.limit) || 5
		const search = req.query.search || ""
		let sort = req.query.sort || "rating"
		let genre = req.query.genre || "All"
		const genreOptions = [
            "Big",
            "Small"
		]
		genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])
		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}
		const products = await Product.find({ productName: { $regex: search, $options: "i" } })
			.where("genre")
			.in([...genre])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);
		const total = await Product.countDocuments({
			genre: { $in: [...genre] },
			productName: { $regex: search, $options: "i" },
		})
		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			genres: genreOptions,
			products,
		}
		res.status(200).json(response)
})
module.exports={
    searchProduct,
}