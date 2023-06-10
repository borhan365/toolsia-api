import mongoose from 'mongoose'

const hospitalDirectorSchema = mongoose.Schema({
  en: {
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  bn: {
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    description: {
      type: String,
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
  common: {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String
    },
    profilePhoto: {
      type: String,
    },
    directorType: {
      type: mongoose.Types.ObjectId, 
      ref: 'DirectorType' 
    },
    hospitalName: {
      type: String
    },
    publishedBy: {
      type: String,
    },
    room: {
      type: String,
    },
    floor: {
      type: String,
    },
    block: {
      type: String,
    },
  },
  bnSlug: {
    type: String,
  },
  enSlug: {
    type: String,
  }
}, { timestamps: true })

const HospitalDirectorModel = mongoose.model('HospitalDirector', hospitalDirectorSchema)
export default HospitalDirectorModel