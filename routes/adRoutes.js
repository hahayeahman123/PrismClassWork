import express from 'express';
import {getAllAds, createAd, updateAd, deleteAd} from './../controllers/adController.js';
import { authenticate } from './../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(getAllAds)
    .post(authenticate, createAd)
router
    .route('/:id')
    .put(authenticate, updateAd)
    .delete(authenticate, deleteAd)

export default router