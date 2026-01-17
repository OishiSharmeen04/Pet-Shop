import express, { Application } from "express";
import cors from "cors";

export const applyGlobalMiddleware = (app: Application): void => {
  app.use(cors());
  app.use(express.json());
};
