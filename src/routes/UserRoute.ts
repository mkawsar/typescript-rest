import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export class UserRoute {
    router: Router;
    public UserController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/register', this.UserController.registerUser);
    }
}