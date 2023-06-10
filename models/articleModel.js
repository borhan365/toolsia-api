import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
    en: {
      basicInfo: {
        title: {
          type: String,
        },
        subTitle: {
          type: String,
        },
        excerpt: {
          type: String,
        },
        description: {
          type: String,
        }
      },
    },
    bn: {
      basicInfo: {
        title: {
          type: String,
        },
        subTitle: {
          type: String,
        },
        excerpt: {
          type: String,
        },
        description: {
          type: String,
        }
      },
    },
    common: {
      basicInfo: {
        fakeView: {
          type: String,
        }, 
        fakeShare: {
          type: String,
        }, 
        isSponsored: {
          type: Boolean,
        },
        postType: {
          type: String,
          default: 'article',
        },
        postStatus: {
          type: String,
        },
      },
    },
    enSlug: {
      type: String,
    },
    bnSlug: {
      type: String,
    },
    categories: [{
      type: mongoose.Types.ObjectId,
      ref: "Category"
    }],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    tags: [{
      type: String,
    }],
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    thumb: {
      type: String,
    },
    doctorList: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      thumb: {
        type: String,
      },
      doctors: [
        {
          _id: {type: String},
          name: {type: String},
          email: {type: String},
          numberOne: {type: String},
          location: {type: String},
          hospital: {type: String},
          specialist: {type: String},
        }
      ]
    }
}, {timestamps: true})

const Article = new mongoose.model('Article', articleSchema)
export default Article;