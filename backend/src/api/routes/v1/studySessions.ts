import { Router } from 'express';
import StudySessionController from '../../controllers/StudySessionController';

// Mounted at /collections/:collectionId/study-sessions — collection context and access
// control are handled by the parent collections router (AuthMiddleware + CollectionAccessMiddleware).
// mergeParams exposes the parent :collectionId to this router and its controllers.

const router: Router = Router({ mergeParams: true });

// UC-4:  POST  /api/v1/collections/:collectionId/study-sessions
router.post('/', StudySessionController.start.bind(StudySessionController));

// UC-9:  GET   /api/v1/collections/:collectionId/study-sessions/active
router.get('/active', StudySessionController.getActive.bind(StudySessionController));

// GET   /api/v1/collections/:collectionId/study-sessions/:sessionId
router.get('/:sessionId', StudySessionController.getById.bind(StudySessionController));

// UC-9:  PATCH /api/v1/collections/:collectionId/study-sessions/:sessionId/pause
router.patch('/:sessionId/pause', StudySessionController.pause.bind(StudySessionController));

// UC-9:  PATCH /api/v1/collections/:collectionId/study-sessions/:sessionId/resume
router.patch('/:sessionId/resume', StudySessionController.resume.bind(StudySessionController));

// FR-16: POST  /api/v1/collections/:collectionId/study-sessions/:sessionId/answers
router.post('/:sessionId/answers', StudySessionController.recordAnswer.bind(StudySessionController));

// UC-4:  PATCH /api/v1/collections/:collectionId/study-sessions/:sessionId/complete
router.patch('/:sessionId/complete', StudySessionController.complete.bind(StudySessionController));

// FR-20: GET   /api/v1/collections/:collectionId/study-sessions/:sessionId/summary
router.get('/:sessionId/summary', StudySessionController.getSummary.bind(StudySessionController));

export default router;
