import mongoose from 'mongoose';

// Software
const softwareCategorySchema = mongoose.Schema({
  basicInfo: {
    name: String,
    oneLineIntro: String,
    excerpt: String,
    description: String,
    flag: String,
    thumbnail: String,
    hightlight: String,
    isFeatured: String,
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
  parentCategoryId: {
    type: mongoose.Types.ObjectId,
    ref: "SoftwareCategory"
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
        isFeatured: String,
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
  articles: [{
    type: mongoose.Types.ObjectId,
    ref: "Article"
  }],
  softwares: [{
    type: mongoose.Types.ObjectId,
    ref: "Software"
  }],
  subCategories: [{
    type: mongoose.Types.ObjectId,
    ref: "SoftwareSubCategory"
  }],
  slug: String,
}, { timestamps: true });

export const categorySchemas = {
  SoftwareCategory: softwareCategorySchema,
};
