import express, {Request, Response} from 'express';
import {body, validationResult} from  'express-validator';
import  { User } from '../models/user';
import {RequestValidationError} from '../errors/request-validation-error';
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
    async (req: Request, res: Response) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser){
        throw new BadRequestError('Email en uso');
    }
    const user = User.build({email, password});
    await user.save();
    res.status(201).send(user)
});

export {router as signupRouter};