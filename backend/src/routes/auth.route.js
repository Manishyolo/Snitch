import {Router} from 'express';
import { RegisterController,LoginController } from '../controllers/auth.controller.js';
import { validateRegisterUser,validateLoginUser } from '../validators/Express_validator.js';
import { GoogleAuthController } from '../controllers/auth.controller.js';
import passport from 'passport';
const router = Router();


router.post('/register', validateRegisterUser, RegisterController)
router.post('/login', validateLoginUser, LoginController)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }),)
router.get("/google/callback", passport.authenticate("google", {session:false}), GoogleAuthController)

export default router;