import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import serverless from 'serverless-http';
import app from './app';
import { AppDataSource } from './config/dataSource';

let isInitialized = false;

const initializeApp = async () => {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Database connected');
      isInitialized = true;
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }
};

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  await initializeApp();
  return serverlessHandler(event, context);
};
