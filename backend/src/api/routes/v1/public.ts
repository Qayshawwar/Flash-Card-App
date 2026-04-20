import { Router } from 'express';
import CollectionController from '../../controllers/CollectionController';
import FlashcardController from '../../controllers/FlashcardController';
import PublicCollectionMiddleware from '../../middlewares/PublicCollectionMiddleware';

const router: Router = Router();

router.param('collectionId', PublicCollectionMiddleware.forCollection.bind(PublicCollectionMiddleware));

// GET /api/v1/public/collections?page=1&limit=30
router.get('/collections', CollectionController.getPublic.bind(CollectionController));

// GET /api/v1/public/collections/:collectionId
router.get('/collections/:collectionId', CollectionController.getPublicCollectionById.bind(CollectionController));

// GET /api/v1/public/collections/:collectionId/flashcards
router.get('/collections/:collectionId/flashcards', FlashcardController.getAllFlashcardsFromPublicCollection.bind(FlashcardController));

export default router;
