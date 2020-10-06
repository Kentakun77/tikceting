import express, {Request, Response} from 'express';
import {body} from  'express-validator';
import jwt from 'jsonwebtoken';

import {validateRequest} from "../middlewares/validate-request";
import  { User } from '../models/user';
import {BadRequestError} from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('El email debe ser valido'),
    body('password')
        .trim()
        .isLength({min: 4, max:20})
        .withMessage('El password debe contener entre 4 y 20 caracteres')],
    validateRequest,
    async (req: Request, res: Response) =>{

    const { email, password } = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser){
        throw new BadRequestError('Email en uso');
    }
    const user = User.build({email, password});
    await user.save();

    //Generando JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    },
        process.env.JWT_KEY!
    );

    //Almacenar jwt en un objeto session
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});

export {router as signupRouter};