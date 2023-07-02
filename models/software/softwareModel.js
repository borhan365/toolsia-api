import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    title: { type: String },
    rating: { type: Number },
    userName: String,
    usingTime: String,
    companySize: String,
    profession: String,
    photo: String,
    reviewDate: String,
    description: { type: String },
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
      ref: 'User',
    },
  },
  { timestamps: true }
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
  { timestamps: true }
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
      isFeatured: String,
      isVerified: String,
      isSponsored: String,
      logo: String,
      banner: String,
      badge: String,
      subTitle: String,
      profileStrength: String,
      upvote: String,
      isAffiliated: String,
    },
    specification: {
      fullAddress: String,
      headquarters: String,
      languages: [String],
      platform: [String],
      businessScope: [String],
      supportSystem: [String],
      targetAudience: [String],
      developmentType: [String],
      companyType: [String],
      teamSize: [String],
      focusClient: [String],
      focusIndustry: [String],
      training: [String],
      paymentType: String,
      pricingModel: [String],
      productLaunch: String,
      apiSupport: String,
      customization: String,
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
      isSpecialDiscount: String,
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
    categories: {
      parentCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'SoftwareCategory',
      },
      subCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'SoftwareSubCategory',
      },
      childCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'SoftwareChildCategory',
      },
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const SoftwareModel = mongoose.model('Software', softwareSchema);
export default SoftwareModel;
