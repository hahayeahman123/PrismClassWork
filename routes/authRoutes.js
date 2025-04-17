import express from 'express';
import {register, login} from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../utils/validators.js';
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
 * /api/v1/auth/register:
 *  post:
 *    summary: Vartotojo registracija
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema: 
 *            type: object
 *            required: [email, password]
 *            properties:
 *              email:
 *                type: string
 *              password: 
 *                type: string
 *    responses:
 *      201:
 *        description: Registracija sekminga
 */


/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: Vartotojo prisijungimas
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema: 
 *            type: object
 *            required: [email, password]
 *            properties:
 *              email:
 *                type: string
 *              password: 
 *                type: string
 *    responses:
 *      201:
 *        description: Prisijungimas sekminga
 */


router.route('/register').post(validate(registerValidator), register);
router.route('/login').post(validate(loginValidator), login);

export default router   