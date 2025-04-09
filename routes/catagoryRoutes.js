import express from 'express';
import { GetCatagories, createCatagory } from '../controllers/catagoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(GetCatagories)
    .post(authenticate, createCatagory)

export default router