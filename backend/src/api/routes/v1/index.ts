import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import collectionsRouter from './collections';
import flashcardsRouter from './flashcards';
import studySessionsRouter from './studySessions';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/collections', collectionsRouter);
router.use('/flashcards', flashcardsRouter);
router.use('/study-sessions', studySessionsRouter);

export default router;
