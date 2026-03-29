import { Request, Response, NextFunction } from 'express';
import CollectionService from '../services/CollectionService';

// Handles HTTP for: /collections and /collections/:id
// Use Cases 3 (create), 5 (delete), 8 (rename), 10 (import), 11 (export), 16 (share)

class CollectionController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async create(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async rename(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async share(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async importFile(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async exportPdf(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }
}

export default new CollectionController();
