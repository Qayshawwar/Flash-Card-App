import { Router } from 'express';
import AuthController from '../../controllers/AuthController';
// TODO: import { body } from 'express-validator' and { validate } from '../../middlewares/validator'
// TODO: add validation chains before each handler (FR-27/28)

const router: Router = Router();

// UC-1: POST /api/v1/auth/login
router.post('/login', AuthController.login);

// UC-2: POST /api/v1/auth/register
router.post('/register', AuthController.register);

// POST /api/v1/auth/logout
router.post('/logout', AuthController.logout);

export default router;
