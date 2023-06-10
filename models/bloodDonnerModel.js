import mongoose from 'mongoose'

const bloodDonnerSchema = mongoose.Schema({
  en: {
    name: {
      type: String,
      require: true,
    },
  },
  bn: {
    name: {
      type: String,
    },
  },
  common: {
    basicInfo: {
      email: {
        type: String,
      },
      bloodGroup: {
        type: String,
      },
      complimentFee: {
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
      profilePhoto: {
        type: String,
      },
      status: {
        type: String,
      },
      profession: {
        type: String
      }
    }
  },
  enSlug: {
    type: String,
  },
  bnSlug: {
    type: String,
  },
  location:  {
    type: mongoose.Types.ObjectId,
    ref: "Location"
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true })

const BloodDonnerModel = new mongoose.model("BloodDonner", bloodDonnerSchema)
export default BloodDonnerModel