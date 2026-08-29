import mongoose from "mongoose"
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
})
export default mongoose.model("Subcategory", subcategorySchema)