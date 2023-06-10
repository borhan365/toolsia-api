import mongoose from 'mongoose';

// Software Sub Category
const softwareSubCategorySchema = mongoose.Schema({
  name: String,
  oneLineIntro: String,
  excerpt: String,
  description: String,
  flag: String,
  thumbnail: String,
  hightlight: String,
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
  articles: [{
    type: mongoose.Types.ObjectId,
    ref: "Article"
  }],
  softwares: [{
    type: mongoose.Types.ObjectId,
    ref: "Software"
  }],
  parentCategory: {
    type: mongoose.Types.ObjectId,
    ref: "SoftwareCategory"
  },
  childCategories: {
    type: mongoose.Types.ObjectId,
    ref: "SoftwareChildCategory"
  },
  slug: String,
}, { timestamps: true });

export const subCategorySchemas = {
  SoftwareSubCategory: softwareSubCategorySchema,
};
