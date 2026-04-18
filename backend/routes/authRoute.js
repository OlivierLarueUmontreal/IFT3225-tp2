import express, { Router } from 'express'
const router = Router();

import { login, logout } from "../controllers/authController.js";

router.route('/login').post(express.json(), login)
router.route('/logout').get(logout)

export { router as authRoute }
