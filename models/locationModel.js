import mongoose from 'mongoose'
const locationSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  onLineIntro: {
    type: String,
  },
  excerpt: {
    type: String,
  },
  description: {
    type: String,
  },
  flag: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  hightlight: {
    type: String,
  },
  table: {
    title: String,
    description: String,
    thumbnail: String
  },
  suggestLinks: {
    title: String,
    description: String,
    links: [{
      label: String,
      url: String,
    }]
  },
  softwares: [{
    type: mongoose.Types.ObjectId,
    ref: "Software"
  }],
  parentId: [{
    type: mongoose.Types.ObjectId,
    ref: "Location"
  }]
})

const LocationModel = mongoose.model('Location', locationSchema)
export default LocationModel