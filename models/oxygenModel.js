import mongoose from 'mongoose'

const oxygenSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  video: {
    type: String,
  },
  address: {
    type: String
  },
  numberOne: {
    type: String,
  },
  numberTwo: {
    type: String,
  },
  excerpt: {
    type: String,
  },
  description: {
    type: String,
  },
  extraMessage: {
    type: String,
  },
  logo: {
    type: String,
  },
  postStatus: {
    type: String,
  },
  location: {
    type: mongoose.Types.ObjectId,
    ref: "Location"
  },
  publisher: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true })

const OxygenModel = new mongoose.model("oxygen", oxygenSchema)
export default OxygenModel