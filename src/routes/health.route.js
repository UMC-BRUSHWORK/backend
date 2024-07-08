import express from 'express';
import { healthController } from '../controllers/health.controller';

export const healthRouter = (app) => {
    app.get('/health', healthController);
};