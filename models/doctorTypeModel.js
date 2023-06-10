import mongoose from 'mongoose'

const doctorTypeSchema = mongoose.Schema({
  en: {
    name: {
      type: String,
    },
    excerpt: {
      type: String
    },
    description: {
      type: String
    },
  },
  bn: {
    name: {
      type: String,
    },
    excerpt: {
      type: String
    },
    description: {
      type: String
    },
  },
  thumb: {
    type: String,
  },
  bnSlug: {
    type: String,
  },
  enSlug: {
    type: String,
  },
  doctors: [{ 
    type: mongoose.Types.ObjectId, 
    ref: 'Doctor' 
  }]
}, { timestamps: true })

const DoctorTypeModel = mongoose.model('DoctorType', doctorTypeSchema)
export default DoctorTypeModel