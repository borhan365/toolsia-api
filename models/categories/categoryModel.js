import mongoose from 'mongoose';
import { categorySchemas } from './categorySchema.js';

const createCategoryModel = (modelName) => {
  const commonSchema = categorySchemas[modelName];
  return mongoose.model(modelName, commonSchema);
};

export default createCategoryModel;
