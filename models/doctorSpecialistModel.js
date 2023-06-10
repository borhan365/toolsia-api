import mongoose from 'mongoose'

const doctorSpecialistSchema = mongoose.Schema({
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
      meaning: {
        type: String
      },
      excerpt: {
        type: String,
      },
      description: {
        type: String,
      },
    }
  },
  faqs: [{
    faq: {
      en: {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
      bn: {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      }
    }
  }],
  icon: {
    type: String,
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

const DoctorSpecialistModel = mongoose.model('DoctorSpecialist', doctorSpecialistSchema)
export default DoctorSpecialistModel
