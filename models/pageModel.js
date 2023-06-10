import mongoose from 'mongoose'

const pageSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  excerpt: {
    type: String,
  },
  description: {
    type: String,
  },
  thumb: {
    type: String,
  },
  status: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  slug: {
    type: String,
  }

}, { timestamps: true })

const PageModel = new mongoose.model("Page", pageSchema)
export default PageModel