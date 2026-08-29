import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    Image: {
        type: String
    },
    imagePublicId: {
        type: String
    },
})
export default mongoose.model("Category", categorySchema)