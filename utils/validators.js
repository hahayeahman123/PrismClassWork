import {body} from 'express-validator';


export const registerValidator = [
    body('email').isEmail().withMessage('Neiteisingas el pasto adresas'),
    body('password').isLength({min:6}).withMessage('Slaptazotis turi buti bent 6 simboliu ilgio')
]

export const loginValidator = [
    body('email').isEmail().withMessage('Neteisingas el pasto adreses'),
    body('password').notEmpty().withMessage('Slaptazodis privalomas')
]

export const catagoryValidator = [
    body('name').isLength({min:5}).withMessage('Kategorijos pavadinimas turi buti didesnis nei 5 simboliu ilgio'),
    body('name').notEmpty().withMessage('Kategorijos pavadinimas yra privalomas')

]

export const adValidator = [
    body('title').notEmpty().withMessage('Reklamos pavadinimas yra privalomas'),
    body('content').isLength({min:6}).withMessage('Reklamos aprasymas turi buti daugiau nei 6 simboliu ilgio')
]