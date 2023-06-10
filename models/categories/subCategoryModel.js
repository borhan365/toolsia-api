import mongoose from 'mongoose';
import { subCategorySchemas } from './subCategorySchema.js';

const subCreateCategoryModel = (modelName) => {
  const commonSchema = subCategorySchemas[modelName];
  return mongoose.model(modelName, commonSchema);
};

export default subCreateCategoryModel;
