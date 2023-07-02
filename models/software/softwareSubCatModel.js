import mongoose from 'mongoose'

const softwareSubCategoryModel = mongoose.Schema({
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
    isFeatured: String,
    fakeShare: String,
    fakeView: String,
    postStatus: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
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
        },
        isFeatured: String,
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
    },
    subTitle: String,
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
  faqs: [
    {
      question: String,
      answer: String,
    },
  ],
  softwares: [{
    type: mongoose.Types.ObjectId,
    ref: "Software"
  }],
  parentCategory: {
    type: mongoose.Types.ObjectId,
    ref: "SoftwareParentCategory"
  },
  childCategories: [{
    type: mongoose.Types.ObjectId,
    ref: "SoftwareChildCategory"
  }],
}, {timestamps: true})

const SoftwareSubCategory = mongoose.model('SoftwareSubCategory', softwareSubCategoryModel)

export default SoftwareSubCategory

