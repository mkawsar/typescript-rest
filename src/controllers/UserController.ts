import bcrypt from 'bcrypt-nodejs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';

import '../middlewares/PassportHandler';
import { User } from '../models/User';
import { JWT_SECRET } from '../utils/Secrets';
import { getErrorMessage } from '../utils/Errors';

export class UserController {
    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            await User.create({
                username: req.body.username,
                password: hashedPassword
            });

            //const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRET);
            res.status(200).send({ message: `username ${req.body.username} created successfully!` });
        } catch (err) {
            res.status(500).send(getErrorMessage(err));
        }
    }
}