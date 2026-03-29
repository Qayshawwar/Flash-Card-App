import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

// Handles HTTP for: POST /auth/register, POST /auth/login, POST /auth/logout
// Use Cases 1 (login) and 2 (register)

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async login(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }
}

export default new AuthController();
