import mongoose from 'mongoose'

const companySchema = mongoose.Schema({
  en: {
    basicInfo: {
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
      address: {
        type: String,
      },
    },
  },
  bn: {
    basicInfo: {
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
      address: {
        type: String,
      },
    },
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
      extraMessage: {
        type: String,
      },
      companyEstd: {
        type: String,
      },
      companyGrowth: {
        type: String,
      },
      companyMarketShare: {
        type: String,
      },
      logo: {
        type: String,
      },
      status: {
        type: String,
      },
      fakeView: {
        type: String,
      }, 
      fakeShare: {
        type: String,
      }, 
      isFeatured: {
        type: Boolean,
      },
      isVerified: {
        type: Boolean,
      },
      isSponsored: {
        type: Boolean,
      },
    },
    socialMedia: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
      pintarest: {
        type: String,
      },
      youtube: {
        type: String,
      }
    },
  },
  enSlug: {
    type: String,
  },
  bnSlug: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  medicines: [{
    type: mongoose.Types.ObjectId,
    ref: "Medicine"
  }],
  jobs: [{
    type: mongoose.Types.ObjectId,
    ref: "Job"
  }],
}, { timestamps: true })

const CompanyModel = new mongoose.model("Company", companySchema)
export default CompanyModel