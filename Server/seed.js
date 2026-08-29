import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Product from "./Models/productSchema.js";
import Category from "./Models/CategoriesSchema.js";
import Subcategory from "./Models/subcategoriesSchema.js";
import Review from "./Models/reviewSchema.js";
import Order from "./Models/orderSchema.js";
import data from "./Data/db.json" with { type: "json" };
import connectDB from "./config/db.js"

await connectDB()

const seedDatabase = async () => {
//     try {
//         for (const categoryData of data.products) {
//             let existingCategory = await Category.findOne({
//                 name: categoryData.category
//             })
//             if (!existingCategory) {
//                 existingCategory = await Category.create({
//                     name: categoryData.category,
//                     Image: categoryData.categoryimage
//                 })
//             }
//             for (const item of categoryData.items) {
//                 let existingSubCategory = await Subcategory.findOne({
//                     name: item.subCategory
//                 })
//                 if (!existingSubCategory) {
//                     existingSubCategory = await Subcategory.create({
//                         name: item.subCategory,
//                         category: existingCategory._id

//                     })
//                 }
//                 let newProduct = await Product.create({
//                     productName: item.name,
//                     description: item.description,
//                     brand: item.brand,
//                     price: item.price,
//                     discount: item.discount,
//                     rating: item.rating,
//                     gender: item.gender,
//                     tags: item.tags,
//                     image: item.image,
//                     subcategory: existingSubCategory._id,
//                     category: existingCategory._id,
//                     seller: null
//                 })
//                 if (item.reviews) {

//                     for (const review of item.reviews) {
//                         await Review.create({
//                             product: newProduct._id,
//                             rating: review.rating,
//                             comment: review.comment,
//                             user: null
//                         })

//                     }
//                 }
//             }

//         }

//     } catch (error) {
//         console.log(error)
//     }
// }
try {
    const reviews = await Review.find();

    for (const review of reviews) {
        await Product.findByIdAndUpdate(
            review.product,
            {
                $addToSet: {
                    reviews: review._id
                }
            }
        );
    }

    console.log("Product reviews references updated");
} catch (error) {
    console.log(error);
}
};
await seedDatabase();
await mongoose.disconnect();
console.log("Seeding completed")