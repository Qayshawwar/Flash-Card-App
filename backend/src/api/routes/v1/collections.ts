import { Router } from 'express';
import CollectionController from '../../controllers/CollectionController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import CollectionAccessMiddleware from '../../middlewares/CollectionAccessMiddleware';
import flashcardsRouter from './flashcards';
import studySessionsRouter from './studySessions';

// TODO: add multer middleware to importFile route (FR-01/22/23)

const router: Router = Router();
router.use(AuthMiddleware.authenticate.bind(AuthMiddleware));
router.use(CollectionAccessMiddleware.forCollection.bind(CollectionAccessMiddleware));

// UC-3:  GET    /api/v1/collections
router.get('/', CollectionController.getAll.bind(CollectionController));

// UC-3:  POST   /api/v1/collections
router.post('/', CollectionController.create.bind(CollectionController));

// UC-8:  PATCH  /api/v1/collections/:collectionId
router.patch('/:collectionId', CollectionController.rename.bind(CollectionController));

// UC-5:  DELETE /api/v1/collections/:collectionId
router.delete('/:collectionId', CollectionController.delete.bind(CollectionController));

// UC-16: POST   /api/v1/collections/:collectionId/share
router.post('/:collectionId/share', CollectionController.share.bind(CollectionController));

// UC-10: POST   /api/v1/collections/:collectionId/import  (multipart/form-data)
router.post('/:collectionId/import', CollectionController.importFile.bind(CollectionController));

// UC-11: GET    /api/v1/collections/:collectionId/export
router.get('/:collectionId/export', CollectionController.exportPdf.bind(CollectionController));

// Sub-resources — both inherit auth + access control from this router
router.use('/:collectionId/flashcards', flashcardsRouter);
router.use('/:collectionId/study-sessions', studySessionsRouter);

export default router;
