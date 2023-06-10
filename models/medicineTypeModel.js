import mongoose from 'mongoose'

const medicineTypeSchema = mongoose.Schema({
  bnName: {
    type: String,
  },
  enName: {
    type: String
  },
  bnSlug: {
    type: String,
  },
  enSlug: {
    type: String,
  },
  icon: {
    type: String,
  },
  medicines: [{ 
    type: mongoose.Types.ObjectId, 
    ref: 'Medicine' 
  }]
}, { timestamps: true })

const MedicineTypeModel = mongoose.model('MedicineType', medicineTypeSchema)
export default MedicineTypeModel