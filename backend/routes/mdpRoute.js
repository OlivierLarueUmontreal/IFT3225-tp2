import express, { Router } from 'express'
const router = Router()
import { generatePassword } from '../controllers/mdpController.js'
 
router.route('/:length').get(generatePassword)

export { router as mdpRoute }; 
