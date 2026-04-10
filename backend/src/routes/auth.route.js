import {Router} from 'express';
import { RegisterController,LoginController } from '../controllers/auth.controller.js';
import { validateRegisterUser,validateLoginUser } from '../validators/Express_validator.js';
const router = Router();


router.post('/register', validateRegisterUser, RegisterController)
router.post('/login', validateLoginUser, LoginController)

export default router;