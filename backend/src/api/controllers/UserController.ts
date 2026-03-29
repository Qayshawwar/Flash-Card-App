import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

// Handles HTTP for: GET/PATCH /users/me, DELETE /users/me, PATCH /users/me/password
// Use Cases 6 (edit profile), 15 (delete account)

class UserController {
    async getProfile(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async updateProfile(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }
}

export default new UserController();
