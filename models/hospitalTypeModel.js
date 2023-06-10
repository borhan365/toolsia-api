import mongoose from 'mongoose'

const hospitalTypeSchema = mongoose.Schema({
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
  enSlug: {
    type: String,
  },
  bnSlug: {
    type: String
  }
}, { timestamps: true })

const HospitalTypeModel = mongoose.model('TypeHospital', hospitalTypeSchema)
export default HospitalTypeModel
