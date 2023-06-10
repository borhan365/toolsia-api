import mongoose from 'mongoose'

const genericSchema = mongoose.Schema({
  en: {
    name: {
      type: String,
    },
    excerpt: {
      type: String
    },
    description: {
      type: String,
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
      type: String,
    },
  },
  common: {
    monograph: {
      type: String,
    },
    thumb: {
      type: String
    },
  },
  enSlug: {
    type: String,
  },
  enSlug: {
    type: String,
  },
  medicines: [{ 
    type: mongoose.Types.ObjectId, 
    ref: 'Medicine' 
  }]
}, { timestamps: true })

const GenericModel = mongoose.model('Generic', genericSchema)
export default GenericModel