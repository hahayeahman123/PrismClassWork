import express from 'express';
import { GetCatagories, createCatagory } from '../controllers/catagoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { catagoryValidator } from '../utils/validators.js';
import { validationResult } from 'express-validator';

const router = express.Router();

const validate =(validator)=>[
    ...validator,
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
            next()

    }
]

/**
 * @swagger
 *  /api/v1/categories:
 *  get:
 *    summary: Gauti kategoriju sarasa
 *    tags: [Kategorijos]
 *    responses:
 *      200:
 *        description: Sarasas grazintas
 *  post:
 *    summary: Naujos kategorijos sukurimas
 *    tags: [Kategorijos]
 *    security:
 *      -  bearAuth: {}
 *    requestBody:
 *      content:
 *        application/json:
 *          schema: 
 *            type: object
 *            required: [name]
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      201:
 *        description: Naujos kategorijos sukurimas yra sekmingas
 */


router
    .route('/')
    .get(GetCatagories)
    .post(validate(catagoryValidator) ,authenticate, createCatagory)

export default router