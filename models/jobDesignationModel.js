import mongoose from 'mongoose';

const jobDesignationSchema = mongoose.Schema({
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
}, { timestamps: true })

const jobDesignation = mongoose.model('JobDesignation', jobDesignationSchema)
export default jobDesignation;