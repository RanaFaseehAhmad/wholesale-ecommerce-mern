import Category from "../Models/categoriesSchema.js"
import Product from "../Models/productSchema.js"
import subCategory from "../Models/subcategoriesSchema.js"
export async function showCategory(req, res) {
    try {
        const category = await Category.find()
        return res.status(200).json({
            message: "category found",
            category
        })
        // console.log("section One:",category)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function getAllCategoryData(req, res) {
    const { categoryId } = req.query
    console.log(categoryId)
    try {
        const [category, products, subcategory] = await Promise.all([
            Category.findById(categoryId),
            Product.find({ category: categoryId }),
            subCategory.find({ category: categoryId })
        ])
        // console.log(category)
        // console.log(products)
        console.log("subCategory:",subcategory)

        return res.status(200).json({
            message: "found",
            category,
            subcategory,
            products,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}