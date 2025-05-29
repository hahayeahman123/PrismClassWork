import express from "express";
import { validationResult } from "express-validator";
import { getCategories, createCategory } from "../controllers/categoryController.js";
import { categoryValidator } from "../utils/validators.js";
import { authentificate, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

const validate = (validator) => [
    ...validator,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Gauti kategoriju sarasa
 *     tags: [Kategorijos]
 *     responses:
 *       200:
 *         description: Sarasas grazintas
 *   post:
 *     summary: Kategorijos kurimas
 *     tags: [Kategorijos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kategorija sukurta
 */

router.get("/", getCategories);
router.post("/", authentificate, isAdmin, validate(categoryValidator), createCategory);

export default router;
