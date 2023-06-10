import mongoose from 'mongoose'

const hospitalSpecialistSchema = mongoose.Schema({
  en: {
    basicInfo: {
      name: {
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
      },
      excerpt: {
        type: String,
      },
      description: {
        type: String,
      },
    }
  },
  logo: {
    type: String,
  },
}, { timestamps: true })

const HospitalSpecialistModel = mongoose.model('HospitalSpecialist', hospitalSpecialistSchema)
export default HospitalSpecialistModel