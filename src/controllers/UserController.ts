import bcrypt from 'bcrypt-nodejs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';

import '../middlewares/PassportHandler';
import { User } from '../models/User';
import { JWT_SECRET } from '../utils/Secrets';

export class UserController {
    public async registerUser(req: Request, res: Response): Promise<void> {
        const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        await User.create({
            username: req.body.username,
            password: hashedPassword
        });

        const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRET);
        res.status(200).send({ token: token });
    }
}