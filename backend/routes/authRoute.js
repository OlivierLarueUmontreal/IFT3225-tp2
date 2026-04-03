import express, {Router} from 'express'
const router = Router();

import { login } from "../controllers/authController.js";

router.route('/login').post(express.json(), login)

export {router as authRoute}
