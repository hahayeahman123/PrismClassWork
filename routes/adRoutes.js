import express from 'express';
import {getAllAds, createAd, updateAd, deleteAd} from './../controllers/adController.js';
import { authenticate } from './../middlewares/authMiddleware.js';
import { adValidator } from '../utils/validators.js';
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
 *  /api/v1/ads/{id}:
 *  put:
 *    summary: Atnaujinti skelbima
 *    tags: [Skelbimai]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *        type: integer
 *    requestBody:
 *      content:
 *        application/json:
 *          schema: 
 *            type: object
 *            required: [title, content, catagoryId]
 *            properties:
 *              title:
 *                type: string
 *              content:
 *                type: string
 *              catagoryId:
 *                type: integer
 *    responses:
 *      200:
 *        description: Atnaujinti skelbima sekmingas
 */

/**
 *  @swagger
 *  /api/v1/ads/{id}:
 *  delete:
 *    summary: Istrinti skelbima
 *    tags: [Skelbimai]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Sekmingai istrinta
 */ 

/**
 * @swagger
 *  /api/v1/ads:
 *  get:
 *    summary: Gauti skelbimu sarasa arba atlikti paieska ir filtravima
 *    tags: [Skelbimai]
 *    parameters:
 *      - in: query
 *        name: catagoryId
 *        schema:
 *          type: integer
 *        description: Filtruoti pagal kategorijos ID
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *        description: ieskoti pagal pavadinima arba aprasyma
 *    responses:
 *      200:
 *        description: Skelbimu sarasas grazintas
 */

/**
 * @swagger
 *  /api/v1/ads:
 *  post:
 *    summary: Sukurti skelbima
 *    tags: [Skelbimai]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema: 
 *            type: object
 *            required: [title, content, catagoryId]
 *            properties:
 *              title:
 *                type: string
 *              content:
 *                type: string
 *              catagoryId:
 *                type: integer
 *    responses:
 *      201:
 *        description: Naujos kategorijos sukurimas yra sekmingas
 */

router
    .route('/')
    .get(getAllAds)
    .post(validate(adValidator),authenticate,createAd)
router
    .route('/:id')
    .put(authenticate, updateAd)
    .delete(authenticate, deleteAd)

export default router