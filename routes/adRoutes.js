import express from "express";
import { validationResult } from "express-validator";
import { getAllAds, createAd, updateAd, deleteAd } from "../controllers/adController.js";
import { authentificate } from "../middleware/authMiddleware.js";
import { adValidator } from "../utils/validators.js";

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
 * /api/v1/ads:
 *   get:
 *     summary: Gauti skelbimus arba atlikti paieska ir filtravima
 *     tags: [Skelbimai]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filtruoti pagal kategorijos id
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Ieskoti pagal pavadinima arba aprasyma
 *     responses:
 *       200:
 *         description: Skelbimu sarasas grazintas
 *   post:
 *     summary: Sukurti skelbima
 *     tags: [Skelbimai]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Skelbimas sukurtas
 */

router.get("/", getAllAds);
router.post("/", authentificate, validate(adValidator), createAd);

/**
 * @swagger
 * /api/v1/ads/{id}:
 *   put:
 *     summary: Atnaujinti skelbima
 *     tags: [Skelbimai]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sekelbimas atnaujintas
 *   delete:
 *     summary: Istrinti skelbima
 *     tags: [Skelbimai]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Sekelbimas istrintas
 */
router.put("/:id", authentificate, validate(adValidator), updateAd);
router.delete("/:id", authentificate, deleteAd);

export default router;
