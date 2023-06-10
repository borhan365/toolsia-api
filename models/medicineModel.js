import mongoose from 'mongoose'

const medicineSchema = mongoose.Schema({ 
  en: {
    basicInfo: {
      name: {
        type: String,
        require: true,
      },
      excerpt: {
        type: String,
      },
      specification: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    content: {
        dosage: {
        type: String
        },
        uses: {
        type: String
        },
        indication: {
        type: String
        },
        contraindication: {
        type: String
        },
        sideEffect: {
        type: String
        },
        pregnancy: {
        type: String
        },
        precaution: {
        type: String
        },
        overdoseEffect: {
        type: String
        },
        therapeuticClass: {
        type: String
        },
        storageCondition: {
        type: String
        },
        alcohol: {
        type: String
        },
        breastfeeding: {
        type: String
        },
        kidney: {
        type: String
        },
        liver: {
        type: String
        },
        beforeTaking: {
        type: String
        },
        storageCondition: {
        type: String
        }
    },
  },
  bn: {
    basicInfo: {
      name: {
        type: String,
        require: true,
      },
      excerpt: {
        type: String,
      },
      specification: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    content: {
        dosage: {
        type: String
        },
        uses: {
        type: String
        },
        indication: {
        type: String
        },
        contraindication: {
        type: String
        },
        sideEffect: {
        type: String
        },
        pregnancy: {
        type: String
        },
        precaution: {
        type: String
        },
        overdoseEffect: {
        type: String
        },
        therapeuticClass: {
        type: String
        },
        storageCondition: {
        type: String
        },
        alcohol: {
        type: String
        },
        breastfeeding: {
        type: String
        },
        kidney: {
        type: String
        },
        liver: {
        type: String
        },
        beforeTaking: {
        type: String
        },
        storageCondition: {
        type: String
        }
    },
  },
  common: {
    basicInfo: {
      price: {
        type: String,
      },
      discountPrice: {
        type: String,
      },
      stock: {
        type: String,
      },
      video: {
        type: String,
      },
      postStatus: {
        type: String,
      },
      strength: {
        type: String,
      },
      packSize: {
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
      publisher: {
        type: mongoose.Types.ObjectId, 
        ref: "User"
      },
      generic: { 
        type: mongoose.Types.ObjectId, 
        ref: "Generic"
      },
      reviewedBy: {
        type: mongoose.Types.ObjectId, 
        ref: "Doctor"
      },
      medicineType: {
        type: mongoose.Types.ObjectId, 
        ref: "MedicineType"
      },
      medicineCompany: {
        type: mongoose.Types.ObjectId, 
        ref: "Company"
      },
      thumb: {
        type: String,
      },
      gallery: [{
        type: String
      }],
    }
  },
  enSlug: {
    type: String
  },
  bnSlug: {
    type: String
  }
}, { timestamps: true })

const MedicineModel = mongoose.model("Medicine", medicineSchema)
export default MedicineModel