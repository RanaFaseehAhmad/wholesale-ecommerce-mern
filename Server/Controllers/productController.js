import Product from "../Models/productSchema.js";
import Subcategory from "../Models/subcategoriesSchema.js"
import review from "../Models/reviewSchema.js";
import Category from "../Models/categoriesSchema.js"
import multer from "multer";
import cloudinary from "../config/cloudinary.js"



export async function searchProduct(req, res) {
    const { query } = req.query
    let filter = {}
    try {
        if (!query) return []
        // console.log("query is ", query)
        const subcategory = await Subcategory.find({
            name: {
                $regex: query,
                $options: "i"
            }
        })
        // console.log(subcategory)
        const result = await Product.find({
            $or: [
                {
                    productName: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    subcategory: {
                        $in: subcategory.map((item) => item._id)
                    }
                }
            ]

        }).limit(6).populate("subcategory", "name")
        // console.log(result)
        if (result.length === 0) {
            return res.status(404).json({
                message: "search not found..."
            })
        }
        return res.status(200).json({
            message: "result found",
            result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function getDiscountProducts(req, res) {
    try {
        const items = await Product.find({
            discount: { $gt: 0 },
        }).sort()
        // console.log("discount items :", items)
        if (!items) {
            return res.status(404).json({
                message: "discounted items not found"
            })
        }
        return res.status(200).json({
            message: "found discounted items",
            items
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function getScrollProducts(req, res) {
    const { cursor } = req.query
    // console.log("cursor:", cursor)
    const filter = {}
    try {
        if (cursor) {
            filter._id = {
                $gt: cursor
            }
        }
        const products = await Product.find(filter).sort({ _id: 1 }).limit(20)
        const nextCursor =
            products.length > 0 ?
                products[products.length - 1]._id :
                null
        // console.log("next Cursor:", nextCursor)
        return res.status(200).json({
            message: "getting products",
            nextCursor,
            products
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function getsearchedProduct(req, res) {
    const { query } = req.query;
    // console.log(productId)
    // console.log("url query:", query)
    try {
        const subcategory = await Subcategory.find({
            name: {
                $regex: query,
                $options: "i"
            }
        })
        // console.log("query subcategory:", subcategory)
        const result = await Product.find({
            $or: [
                {
                    productName: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    subcategory: {
                        $in: subcategory.map((item) => item._id)
                    }
                }
            ]
        }).populate("subcategory", "name -_id")
        if (result.length === 0) {
            return res.status(404).json({
                message: "products not found",
            })
        }
        return res.status(200).json({
            message: "products found",
            result
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function getDiscountProductsandCategory(req, res) {
    try {
        const results = await Product.aggregate([
            {
                $match: {
                    discount: {
                        $gt: 0
                    }
                }
            },
            {
                $facet: {
                    products: [
                        {
                            $sort: { discount: -1 }
                        }
                    ],
                    category: [
                        {
                            $group: {
                                _id: "$category"
                            }
                        },
                        {
                            $lookup: {
                                from: "categories",
                                localField: "_id",
                                foreignField: "_id",
                                as: "category"

                            }
                        },
                        {
                            $unwind: "$category"
                        },
                        {
                            $project: {
                                _id: "$category._id",
                                name: "$category.name"
                            }
                        }
                    ]
                }
            }
        ])
        return res.status(200).json({
            message: "Found discounted products and their categories",
            products: results[0].products,
            category: results[0].category
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function getProductByFiltersubCategory(req, res) {
    try {
        const { searchQuery, subcategoryId } = req.query
        // console.log(searchQuery);
        //   console.log(subcategoryId);
        const filter = JSON.parse(req.query.filter)
        let page = parseInt(req.query.page) || 1
        let pageLimit = parseInt(req.query.pageLimit) || 5
        let query = {}

        if (searchQuery) {
            const subcategoryName = await Subcategory.findOne({
                name: {
                    $regex: searchQuery,
                    $options: "i"
                }
            })
            if (subcategoryName) {
                query.subcategory = subcategoryName._id
            }
            else {
                const productName = await Product.findOne({
                    productName: {
                        $regex: searchQuery,
                        $options: "i"
                    }
                })
                if (productName) {
                    query.subcategory = productName.subcategory
                }
                else {
                    query.subcategory = null;
                }
            }
        }
        else if (subcategoryId) {
            query.subcategory = subcategoryId;
        }

        if (filter?.country) {
            query.country = filter.country
        }
        if (filter?.rating) {
            query.rating = { $gte: Number(filter.rating) }
        }
        if (filter?.brand) {
            query.brand = filter.brand
        }
        if (filter?.features?.length) {
            query.features = { $in: filter.features }
        }
        if (filter?.min || filter?.max) {
            query.price = {}

            if (filter.min) {
                query.price.$gte = Number(filter.min)
            }

            if (filter.max) {
                query.price.$lte = Number(filter.max)
            }
        }
        if (filter?.condition) {
            query.condition = filter.condition
        }


        const totalProducts = await Product.countDocuments(query);

        const skip = (page - 1) * pageLimit

        const totalPages = Math.ceil(totalProducts / pageLimit)
        // console.log(totalPages)

        const result = await Product.find(query)
            .populate("subcategory", "name")
            .skip(skip)
            .limit(pageLimit)
        // console.log("plain products:", result)
        return res.status(200).json({
            message: "found",
            result,
            totalPages,
            skip,
            totalProducts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function getItemDetail(req, res) {
    const { productId } = req.params
    // console.log("productId:",productId)
    try {
        const result = await Product.findById(productId)
            .populate("subcategory", "name")
            .populate("category", "name")
            .populate("reviews", "rating")

        return res.status(200).json({
            message: "product found",
            result
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function getrecommendedItems(req, res) {
    const { productSubcategoryId } = req.params

    // console.log("productSubcategoryId", productSubcategoryId)
    try {
        const result = await Product.find({
            subcategory: productSubcategoryId
        })
        // console.log(result)
        return res.status(200).json({
            message: "found recommended items",
            result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}