import mongoose from 'mongoose'

const jobSchema = mongoose.Schema({
  basicInfo: {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    numberOne: {
      type: String,
    },
    numberTwo: {
      type: String,
    },
    website: {
      type: String,
    },
    video: {
      type: String,
    },
    qualification: {
      type: String,
    },
    jobType: {
      type: String
    },
    experience: {
      type: String,
    },
    expire: {
      type: String,
    },
    address: {
      type: String,
    },
    notics: {
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
    status: {
      type: String,
    },
  },
  comapny: {
    type: mongoose.Types.ObjectId,
    ref: "Company"
  },
  slug: {
    type: String,
  },
  location: {
    type: mongoose.Types.ObjectId,
    ref: "Location"
  },
  location: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true })

const JobModel = new mongoose.model("Job", jobSchema)
export default JobModel