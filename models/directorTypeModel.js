import mongoose from 'mongoose'

const directorTypeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  bnName: {
    type: String,
  },
  slug: {
    type: String,
  },
  directors: [{ 
    type: mongoose.Types.ObjectId, 
    ref: 'Director' 
  }]
}, { timestamps: true })

const DirectorTypeModel = mongoose.model('DirectorType', directorTypeSchema)
export default DirectorTypeModel