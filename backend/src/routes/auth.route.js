import { Router } from 'express';
import { RegisterController, LoginController, GoogleAuthController, GetMeController } from '../controllers/auth.controller.js';
import { validateRegisterUser, validateLoginUser } from '../validators/Express_validator.js';
import passport from 'passport';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = Router();

router.get('/getme', authenticate, GetMeController)
router.post('/register', validateRegisterUser, RegisterController)
router.post('/login', validateLoginUser, LoginController)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }),)
router.get("/google/callback", passport.authenticate("google", { session: false }), GoogleAuthController)

export default router;