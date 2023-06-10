import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const FAQ = mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String
  }
})


const doctorSchema = mongoose.Schema({
  basicInfo: [{
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
    numbers: {
      numberOne: {
        type: String,
      },
      numberTwo: {
        type: String,
      },
      numberThree: {
        type: String,
      }
    },
    address: {
      type: String,
    },
    about: {
      type: String,
    },
    profile: {
      type: String,
    },
    banner: {
      type: String,
    }, 
    gallery: [{
      type: String,
    }],
    website: {
      type: String,
    },
    video: {
      type: String,
    },
    social: {
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
    isVerified: {
      type: Boolean,
    },
    experience: {
      type: Number,
    },
    bmdc: {
      type: Number,
    },
    visitingCard: {
      type: String,
    },
    fee: {
      type: Number,
    },
    description: {
      type: String,
    },
  }],
  location: {
    type: mongoose.Types.ObjectId,
    ref: "Location"
  },
  eductaion: {
    college: {
      type: mongoose.Types.ObjectId,
      ref: "Hospital"
    },
    passingYear: {
      type: String,
    },
    specialist: {
      type: mongoose.Types.ObjectId,
      ref: "Specialist"
    },
    degree: {
      type: mongoose.Types.ObjectId,
      ref: "Degree"
    }
  },
  reviews: [reviewSchema],
  faq: [FAQ],
  specialist: {
    type: mongoose.Types.ObjectId,
    ref: "Specialist"
  },
  skill: [{
    name: {
      type: String,
    }
  }],
  extraMessage: {
    type: String,
  },
  doctorWorkAt: {
      hospitalName: {
        type: mongoose.Types.ObjectId,
        ref: "Hospital"
      },
      specialist: {
        type: mongoose.Types.ObjectId,
        ref: "Specialist"
      },
      jobExperiance: {
        type: String
      }
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true })

const DoctorModel = mongoose.model("Doctor", doctorSchema)
export default DoctorModel