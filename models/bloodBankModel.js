import mongoose from 'mongoose'

const bloodBankSchema = mongoose.Schema({
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
  banner: {
    type: String,
  },
  status: {
    type: String,
  },
  location: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Location"
    }
  ],
  user: {
    // type: mongoose.Types.ObjectId,
    // ref: "User"
    type: String
  }

}, { timestamps: true })

const BloodBankModel = new mongoose.model("Bloodbank", bloodBankSchema)
export default BloodBankModel