import {Router} from 'express';
import { RegisterController } from '../controllers/auth.controller.js';
import { validateRegisterUser } from '../validators/Express_validator.js';
const router = Router();


router.post('/register', validateRegisterUser, RegisterController)


export default router;