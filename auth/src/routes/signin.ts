import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';
import {validateRequest, BadRequestError} from "@cerff/common";

import {Password} from "../services/password";
import {User} from "../models/user";


const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email debe ser valido'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('DDebe ingresar un password')],
    validateRequest,
    async (req: Request, res: Response) =>{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (!existingUser){
            throw new BadRequestError('Credenciales invalidas')
        }
        const passwordMatch = await Password.compare(existingUser.password, password);
        if (!passwordMatch){
            throw new BadRequestError('Credenciales invalidas')
        }
        //Generando JWT
        const userJwt = jwt.sign({
                id: existingUser.id,
                email: existingUser.email
            },
            process.env.JWT_KEY!
        );

        //Almacenar jwt en un objeto session
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
    });

export {router as signinRouter};