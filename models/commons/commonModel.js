import mongoose from 'mongoose';
import { commonSchemas } from './commonSchemas.js';

const createCommonModel = (modelName) => {
  const commonSchema = commonSchemas[modelName];
  return mongoose.model(modelName, commonSchema);
};

export default createCommonModel;
