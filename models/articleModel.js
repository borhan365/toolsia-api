import mongoose from 'mongoose';

const articleSchema = mongoose.Schema(
  {
    basicInfo: {
      title: String,
      subTitle: String,
      excerpt: String,
      description: String,
    },
    common: {
      fakeView: String,
      fakeShare: String,
      isSponsored: Boolean,
      isPinned: Boolean,
      postStatus: String,
    },
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    slug: String,
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'Doctor',
    },
    slug: String,
    thumb: String,
    doctorList: {
      title: String,
      description: String,
      thumb: String,
      doctors: [
        {
          _id: String,
          name: String,
          email: String,
          numberOne: String,
          location: String,
          hospital: String,
          specialist: String,
        },
      ],
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
);

const Article = mongoose.model('Article', articleSchema);
export default Article;
