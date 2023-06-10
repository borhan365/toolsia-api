import mongoose from 'mongoose'

const hospitalServicesSchema = mongoose.Schema({
  enName: {
    type: String,
  },
  bnName: {
    type: String,
  },
  slug: {
    type: String,
  },
  icon: {
    type: String,
  },
  logo: {
    type: String,
  },
}, { timestamps: true })

const ServiceModel = mongoose.model('HospitalServices', hospitalServicesSchema)
export default ServiceModel