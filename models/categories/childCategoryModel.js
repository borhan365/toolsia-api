import mongoose from 'mongoose';
import { childCategorySchemas } from './childCategorySchema.js';

const childCreateCategoryModel = (modelName) => {
  const commonSchema = childCategorySchemas[modelName];
  return mongoose.model(modelName, commonSchema);
};

export default childCreateCategoryModel;
