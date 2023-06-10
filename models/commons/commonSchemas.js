import mongoose from 'mongoose';

// Language
const languageSchema = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Company type
const companyType = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Client
const focusClient = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Industry
const focusIndustry = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Service
const focusService = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Pricing
const pricingModel = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Team size
const teamSize = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Review source
const reviewSource = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Review profession
const reviewProfession = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Using time
const usingTime = mongoose.Schema({
  name: String,
}, { timestamps: true });

// Ads slot
const adSlot = mongoose.Schema({
  name: String,
}, { timestamps: true });

// company size
const companySize = mongoose.Schema({
  name: String,
}, { timestamps: true });

export const commonSchemas = {
  Language: languageSchema,
  CompanyType: companyType,
  FocusClient: focusClient,
  FocusIndustry: focusIndustry,
  FocusService: focusService,
  PricingModel: pricingModel,
  TeamSize: teamSize,
  ReviewSource: reviewSource,
  ReviewProfession: reviewProfession,
  UsingTime: usingTime,
  AdSlot: adSlot,
  CompanySize: companySize,
};
