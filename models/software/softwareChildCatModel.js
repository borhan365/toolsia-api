import mongoose from 'mongoose'

const softwareChildCategoryModel = mongoose.Schema({
  basicInfo: {
    name: {
      type: String,
      required: true,
    },
    oneLineIntro: String,
    excerpt: String,
    description: String,
    flag: String,
    thumbnail: String,
    highlight: String,
    isFeatured: String
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
  softwares: [{
    type: mongoose.Types.ObjectId,
    ref: "Software"
  }],
  parentCategory: {
    type: mongoose.Types.ObjectId,
    ref: "SoftwareParentCategory"
  },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "SoftwareSubCategory"
  },
}, {timestamps: true})

const SoftwareChildCategory = mongoose.model('SoftwareChildCategory', softwareChildCategoryModel)

export default SoftwareChildCategory

