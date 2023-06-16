import express from 'express';
import createCommonController from '../../controllers/commons/commonController.js';

const router = express.Router();

// Models
const LanguageController = createCommonController('Language');
const CompanyTypeController = createCommonController('CompanyType');
const FocusClientController = createCommonController('FocusClient');
const FocusIndustryController = createCommonController('FocusIndustry');
const FocusServiceController = createCommonController('FocusService');
const PricingModelController = createCommonController('PricingModel');
const TeamSizeController = createCommonController('TeamSize');
const ReviewSourceController = createCommonController('ReviewSource');
const ReviewProfessionController = createCommonController('ReviewProfession');
const UsingTimeController = createCommonController('UsingTime');
const AdSlotController = createCommonController('AdSlot');
const CompanySizeController = createCommonController('CompanySize');
const BusinessScopeController = createCommonController('BusinessScope');

// Language Routes
router.post('/language', LanguageController.create);
router.put('/language/:id', LanguageController.update);
router.get('/language/:id', LanguageController.getSingle);
router.get('/language', LanguageController.getAll);
router.delete('/language/:id', LanguageController.deleteSingle);
router.delete('/language', LanguageController.deleteAll);

// Company type
router.post('/company-type', CompanyTypeController.create);
router.put('/company-type/:id', CompanyTypeController.update);
router.get('/company-type/:id', CompanyTypeController.getSingle);
router.get('/company-type', CompanyTypeController.getAll);
router.delete('/company-type/:id', CompanyTypeController.deleteSingle);
router.delete('/company-type', CompanyTypeController.deleteAll);

// Focus client
router.post('/focus-client', FocusClientController.create);
router.put('/focus-client/:id', FocusClientController.update);
router.get('/focus-client/:id', FocusClientController.getSingle);
router.get('/focus-client', FocusClientController.getAll);
router.delete('/focus-client/:id', FocusClientController.deleteSingle);
router.delete('/focus-client', FocusClientController.deleteAll);

// Focus industry
router.post('/focus-industry', FocusIndustryController.create);
router.put('/focus-industry/:id', FocusIndustryController.update);
router.get('/focus-industry/:id', FocusIndustryController.getSingle);
router.get('/focus-industry', FocusIndustryController.getAll);
router.delete('/focus-industry/:id', FocusIndustryController.deleteSingle);
router.delete('/focus-industry', FocusIndustryController.deleteAll);

// Focus service
router.post('/focus-service', FocusServiceController.create);
router.put('/focus-service/:id', FocusServiceController.update);
router.get('/focus-service/:id', FocusServiceController.getSingle);
router.get('/focus-service', FocusServiceController.getAll);
router.delete('/focus-service/:id', FocusServiceController.deleteSingle);
router.delete('/focus-service', FocusServiceController.deleteAll);

// Pricing model
router.post('/pricing-model', PricingModelController.create);
router.put('/pricing-model/:id', PricingModelController.update);
router.get('/pricing-model/:id', PricingModelController.getSingle);
router.get('/pricing-model', PricingModelController.getAll);
router.delete('/pricing-model/:id', PricingModelController.deleteSingle);
router.delete('/pricing-model', PricingModelController.deleteAll);

// Team size
router.post('/team-size', TeamSizeController.create);
router.put('/team-size/:id', TeamSizeController.update);
router.get('/team-size/:id', TeamSizeController.getSingle);
router.get('/team-size', TeamSizeController.getAll);
router.delete('/team-size/:id', TeamSizeController.deleteSingle);
router.delete('/team-size', TeamSizeController.deleteAll);

// Review source
router.post('/review-source', ReviewSourceController.create);
router.put('/review-source/:id', ReviewSourceController.update);
router.get('/review-source/:id', ReviewSourceController.getSingle);
router.get('/review-source', ReviewSourceController.getAll);
router.delete('/review-source/:id', ReviewSourceController.deleteSingle);
router.delete('/review-source', ReviewSourceController.deleteAll);

// Review profession
router.post('/review-profession', ReviewProfessionController.create);
router.put('/review-profession/:id', ReviewProfessionController.update);
router.get('/review-profession/:id', ReviewProfessionController.getSingle);
router.get('/review-profession', ReviewProfessionController.getAll);
router.delete('/review-profession/:id', ReviewProfessionController.deleteSingle);
router.delete('/review-profession', ReviewProfessionController.deleteAll);

// Using time
router.post('/using-time', UsingTimeController.create);
router.put('/using-time/:id', UsingTimeController.update);
router.get('/using-time/:id', UsingTimeController.getSingle);
router.get('/using-time', UsingTimeController.getAll);
router.delete('/using-time/:id', UsingTimeController.deleteSingle);
router.delete('/using-time', UsingTimeController.deleteAll);

// Ads slot
router.post('/ads-slot', AdSlotController.create);
router.put('/ads-slot/:id', AdSlotController.update);
router.get('/ads-slot/:id', AdSlotController.getSingle);
router.get('/ads-slot', AdSlotController.getAll);
router.delete('/ads-slot/:id', AdSlotController.deleteSingle);
router.delete('/ads-slot', AdSlotController.deleteAll);

// Company size
router.post('/company-size', CompanySizeController.create);
router.put('/company-size/:id', CompanySizeController.update);
router.get('/company-size/:id', CompanySizeController.getSingle);
router.get('/company-size', CompanySizeController.getAll);
router.delete('/company-size/:id', CompanySizeController.deleteSingle);
router.delete('/company-size', CompanySizeController.deleteAll);

// Business scope
router.post('/business-scope', BusinessScopeController.create);
router.put('/business-scope/:id', BusinessScopeController.update);
router.get('/business-scope/:id', BusinessScopeController.getSingle);
router.get('/business-scope', BusinessScopeController.getAll);
router.delete('/business-scope/:id', BusinessScopeController.deleteSingle);
router.delete('/business-scope', BusinessScopeController.deleteAll);

export default router;
