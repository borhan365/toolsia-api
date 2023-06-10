import mongoose from 'mongoose';

const timestampsMixin = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

const reviewSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    userName: String,
    usingTime: String,
    companySize: String,
    profession: String,
    photo: String,
    reviewDate: String,
    description: { type: String, required: true },
    sourceName: String,
    sourceLink: String,
    pros: String,
    cons: String,
    easeOfUse: String,
    valueOfMoney: String,
    customerSupport: String,
    functionality: String,
    features: String,
    expertise: String,
    communication: String,
    responsiveness: String,
    timeline: String,
    costEstimates: String,
    quality: String,
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: timestampsMixin }
);

const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: timestampsMixin }
);

const softwareSchema = mongoose.Schema(
  {
    basicInfo: {
      name: { type: String, required: true },
      oneLineIntro: String,
      excerpt: String,
      description: String,
      highlight: String,
      keyFeatures: String,
      postStatus: String,
      fakeView: String,
      fakeShare: String,
      fakeFollow: String,
      fakeSaved: String,
      isFeatured: Boolean,
      isVerified: Boolean,
      isSponsored: Boolean,
      logo: String,
      banner: String,
      badge: String,
      subTitle: String,
      profileStrength: String,
      upvote: String,
    },
    specification: {
      fullAddress: String,
      headquarters: String,
      languages: [String],
      platform: String,
      businessScope: [String],
      supportSystem: [String],
      targetAudience: [String],
      developmentType: [String],
      apiSupport: String,
      customization: String,
      companyType: String,
      teamSize: String,
      focusClient: String,
      focusIndustry: String,
      training: String,
      paymentType: String,
      pricingModel: [String],
      productLaunch: String,
      techie_id: {
        type: mongoose.Types.ObjectId,
        ref: 'techie',
      },
      parentCompany: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
      },
      website: String,
      emailOne: String,
      emailTwo: String,
      emailThree: String,
      phone: String,
      freeTrial: String,
      freeVersion: String,
    },
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      pinterest: String,
      youtube: String,
    },
    prosCons: {
      pros: String,
      cons: String,
    },
    pricing: [
      {
        planName: String,
        regularPrice: String,
        discountPrice: String,
        priceType: String,
        badge: String,
        oneLineIntro: String,
        description: String,
        features: String,
      },
    ],
    messages: [
      {
        title: String,
        description: String,
        techie_id: {
          type: mongoose.Types.ObjectId,
          ref: 'techie',
        },
      },
    ],
    productTable: {
      title: String,
      description: String,
      productLinks: String,
    },
    comparisons: [
      {
        productOne: String,
        productTwo: String,
        productThree: String,
      },
    ],
    productAds: [
      {
        product_id: {
          type: mongoose.Types.ObjectId,
          ref: 'Software',
        },
        slot: String,
        image: String,
        text: {
          name: String,
          oneLineIntro: String,
          logo: String,
          buttonLabel: String,
          buttonUrl: String,
          offerLabel: String,
        },
      },
    ],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    slug: String,
    videos: [
      {
        url: String,
      },
    ],
    screenShots: [String],
    profileClaimed: {
      isClaimed: String,
      vendor_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    },
    publisher: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    articles: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Article',
      },
    ],
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Categories',
      },
    ],
    reviews: [reviewSchema],
  },
  { timestamps: timestampsMixin }
);

const SoftwareModel = mongoose.model('Software', softwareSchema);
export default SoftwareModel;