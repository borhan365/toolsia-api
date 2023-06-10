import mongoose from 'mongoose'

const ambulanceSchema = mongoose.Schema({
  en: {
    basicInfo: {
      name: {
        type: String,
        require: true,
      },
      address: {
        type: String,
      },
      excerpt: {
        type: String,
      },
      description: {
        type: String,
      },
    }
  },
  bn: {
    basicInfo: {
      name: {
        type: String,
        require: true,
      },
      address: {
        type: String,
      },
      excerpt: {
        type: String,
      },
      description: {
        type: String,
      },
    }
  },
  common: {
    basicInfo: {
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
      numberThree: {
        type: String,
      },
      extraMessage: {
        type: String,
      },
      logo: {
        type: String
      },
      banner: {
        type: String,
      },
      postStatus: {
        type: String,
      },
      fakeView: {
        type: String,
      }, 
      fakeShare: {
        type: String,
      }, 
      isVerified: {
        type: Boolean,
      },
      isSponsored: {
        type: Boolean,
      },
    }
  },
  enSlug: {
    type: String
  },
  bnSlug: {
    type: String
  },
  // location: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Location"
  // },
  publisher: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true })

const AmbulanceModel = new mongoose.model("Ambulance", ambulanceSchema)
export default AmbulanceModel