import mongoose from 'mongoose'

const doctorDegreeSchema = mongoose.Schema({
  enName: {
    type: String,
  },
  bnName: {
    type: String,
  },
  enSlug: {
    type: String,
  },
  bnSlug: {
    type: String,
  }
}, { timestamps: true })

const DegreeModel = mongoose.model('DoctorDegree', doctorDegreeSchema)
export default DegreeModel