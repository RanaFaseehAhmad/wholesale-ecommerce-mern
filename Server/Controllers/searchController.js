// import Product from "../Models/productSchema.js"
// import Subcategory from "../Models/subcategoriesSchema.js"

// export async function searchBar(req, res) {
//     const { query } = req.query
//     let filter = {}
//     try {
//         if (query === "") return []
//         console.log("query is ", query)
//         const subcategory = await Subcategory.find({
//             name: {
//                 $regex: query,
//                 $options: "i"
//             }
//         })
//         console.log(subcategory)
//         const result = await Product.find({
//             $or: [
//                 {
//                     productName: {
//                         $regex: query,
//                         $options: "i"
//                     }
//                 },
//                 {
//                     subcategory: {
//                         $in: subcategory.map((item) => item._id)
//                     }
//                 }
//             ]

//         }).populate("subcategory", "name").populate("productName")
//         console.log(result)
//         return res.status(200).json({
//             message: "result found",
//             result
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             message: error.message
//         })
//     }
// }