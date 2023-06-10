import mongoose from 'mongoose'

const hospitalFeaturesSchema = mongoose.Schema({
  enName: {
    type: String,
  },
  bnName: {
    type: String,
  },
  slug: {
    type: String,
  }
}, { timestamps: true })

const FeatureModel = mongoose.model('HospitalFeatures', hospitalFeaturesSchema)
export default FeatureModel