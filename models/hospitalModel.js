import mongoose from 'mongoose'

// const reviewSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

const hospitalSchema = mongoose.Schema({
  en: {
    basicInfo: {
      name: {
        type: String,
        require: true,
      },
      address: {
        type: String,
      },
      excerpt: {
        type: String,
      },
      highlights: {
        type: String,
      },
      description: {
        type: String,
      },
      rent: {
        type: String,
      },
    }
  },
  bn: {
    basicInfo: {
      name: {
        type: String,
        require: true,
      },
      address: {
        type: String,
      },
      excerpt: {
        type: String,
      },
      highlights: {
        type: String,
      },
      description: {
        type: String,
      },
      rent: {
        type: String,
      },
    }
  },
  common: {
    basicInfo: {
      email: {
        type: String,
      },
      estd: {
        type: String,
      },
      website: {
        type: String,
      },
      video: {
        type: String,
      },
      numberOne: {
        type: String,
      },
      numberTwo: {
        type: String,
      },
      numberThree: {
        type: String,
      },
      gallery: [{
        type: String,
      }],
      ward: {
        type: String,
      },
      cabin: {
        type: String,
      },
      icu: {
        type: String,
      },
      bed: {
        type: String,
      },
      
      extraMessage: {
        type: String,
      },
      fakeView: {
        type: String,
      }, 
      fakeShare: {
        type: String,
      }, 
      isFeatured: {
        type: Boolean,
      },
      isVerified: {
        type: Boolean,
      },
      isSponsored: {
        type: Boolean,
      },
      postStatus: {
        type: String,
      },
      hospitalType: {
        type: String,
      },
      hospitalSpecialist: {
        type: String,
      },
      logo: {
        type: String,
      },
      banner: {
        type: String,
      }, 
      googleMap: {
        type: String,
      }
    },
    socialMedia: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
      pintarest: {
        type: String,
      },
      youtube: {
        type: String,
      }
    },
    ads: {
      textAds: {
        type: String,
      },
      imageAds: {
        type: String,
      }
    },
  },
  enSlug: {
    type: String,
  },
  bnSlug: {
    type: String,
  },
  faqs: [{
    faq: {
      en: {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
      bn: {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      }
    }
  }],
  messages: [{
    message: {
      en: {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
      bn: {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
      profileId: {
        type: String,
      }
    }
  }],
  floorWiseDetails: [{
    floor: {
      en: {
        title: {
          type: String,
        },
        description: {
          type: String,
        }
      },
      bn: {
        title: {
          type: String,
        },
        description: {
          type: String,
        }
      }
    }
  }],
  
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },  
  location: [{
    type: mongoose.Types.ObjectId,
    ref: "Location"
  }],
  branch: [{
    type: mongoose.Types.ObjectId,
    ref: "Hospital"
  }],
  // reviews: [reviewSchema],
  features: [{
    type: mongoose.Types.ObjectId,
    ref: "Feature"
  }],
  services: [{
    type: mongoose.Types.ObjectId,
    ref: "Service"
  }],
  directors: [{
    type: mongoose.Types.ObjectId,
    ref: "DirectorType"
  }],

}, { timestamps: true })

const HospitalModel = new mongoose.model("Hospital", hospitalSchema)
export default HospitalModel