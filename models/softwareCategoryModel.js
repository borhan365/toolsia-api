import mongoose from 'mongoose'

const softwareCategoryModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  oneLineIntro: {
    type: String
  },
  excerpt: {
    type: String
  },
  description: {
    type: String
  },
  thumbnail: {
    type: String
  },
  buyingGuide: {
    featuredProducts: [{
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "Software"
      },
      product: {
        name: {
          type: String
        },
        oneLineIntro: {
          type: String
        },
        excerpt: {
          type: String
        },
        buttonLabel: {
          type: String
        },
        buttonUrl: {
          type: String
        },
        buttonBadge: {
          type: String
        },
        logo: {
          type: String
        }
      }
    }],
    title: {
      type: String
    },
    description: {
      type: String
    },
    thumbnail: {
      type: String
    }
  },
  featuredLinks: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    links: [{
      label: {
        type: String
      },
      url: {
        type: String
      }
    }]
  },
  slug: {
    type: String,
  },
  articles: [{
    type: mongoose.Types.ObjectId,
    ref: "Article"
  }],
  softwares: [{
    type: mongoose.Types.ObjectId,
    ref: "Software"
  }],
  parentId: {
    type: String,
  }
}, {timestamps: true})

const SoftwareCategory = mongoose.model('OldSoftwareCategory', softwareCategoryModel)

export default SoftwareCategory

