import { body } from "express-validator";

export const registerValidator = [
    body("email").isEmail().withMessage("Neteisingas el. pasto adresas"),
    body("password").isLength({ min: 6 }).withMessage("Slaptazodis turi buti bent 6 simboliu ilgio"),
];

export const loginValidator = [
    body("email").isEmail().withMessage("Neteisingas el. pasto adresas"),
    body("password").notEmpty().withMessage("Slaptazodis privalomas"),
];

export const adValidator = [
    body("title").notEmpty().withMessage("Pavadinimo laukas negali buti tuscias"),
    body("content").notEmpty().withMessage("Aprasymo laukas negali buti tuscias"),
    body("categoryId")
        .notEmpty().withMessage("Aprasymo laukas negali buti tuscias")
        .isNumeric().withMessage('Kategorijos ID turi buti numeris'),
];

export const categoryValidator = [
    body("name").notEmpty().withMessage("Kategorijos laukas negali buti tuscias"),
];
