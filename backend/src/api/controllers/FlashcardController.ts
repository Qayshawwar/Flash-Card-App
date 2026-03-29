import { Request, Response, NextFunction } from 'express';
import FlashcardService from '../services/FlashcardService';

// Handles HTTP for: /collections/:collectionId/flashcards and /flashcards/:id
// Use Cases 4 (study/self-grade), 7 (difficult), 13 (search), 14 (create)

class FlashcardController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async getFlagged(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async search(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async create(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async update(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }

    async duplicate(req: Request, res: Response, next: NextFunction) {
       
        next(new Error('Not implemented'));
    }

    async toggleFlag(req: Request, res: Response, next: NextFunction) { 
        next(new Error('Not implemented'));
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        next(new Error('Not implemented'));
    }
}

export default new FlashcardController();
