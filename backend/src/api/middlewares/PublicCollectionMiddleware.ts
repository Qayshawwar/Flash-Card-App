import { Request, Response, NextFunction } from 'express';
import CollectionService from '../services/CollectionService';
import { BadRequestError } from '../../errors';

// Resolves :collectionId for unauthenticated public routes.
// Fetches the collection and verifies visibility === 'public', then attaches it to req.collection.
// Used by the /api/v1/public router in place of CAM.

class PublicCollectionMiddleware {
    async forCollection(req: Request, res: Response, next: NextFunction, id: string): Promise<void> {
        const numId = parseInt(id, 10);
        if (isNaN(numId)) {
            return next(new BadRequestError('collectionId must be a positive integer.'));
        }

        try {
            req.collection = await CollectionService.getPublicCollectionById(numId);
            next();
        } catch (err) {
            next(err);
        }
    }
}

export default new PublicCollectionMiddleware();
