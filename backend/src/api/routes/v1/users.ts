import { Router } from 'express';
import UserController from '../../controllers/UserController';


const router: Router = Router();
// All routes require authentication TBD


// UC-6: GET /api/v1/users/me
router.get('/me', UserController.getProfile.bind(UserController));

// UC-6: PATCH /api/v1/users/me
router.patch('/me', UserController.updateProfile.bind(UserController));

// UC-6: PATCH /api/v1/users/me/password
router.patch('/me/password', UserController.changePassword.bind(UserController));

// UC-15: DELETE /api/v1/users/me
router.delete('/me', UserController.deleteAccount.bind(UserController));

export default router;
