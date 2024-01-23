import express from 'express';
import asyncHandler from 'express-async-handler';

import { imageUploader } from '../middleware/image.uploader';
import { dbTestController, imageTestController } from '../controllers/test.controller';

export const testRouter = express.Router();

testRouter.post('/s3', imageUploader.single('image'), imageTestController);
testRouter.get('/db', asyncHandler(dbTestController));
