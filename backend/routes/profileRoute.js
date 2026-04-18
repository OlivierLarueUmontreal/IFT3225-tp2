import express, { Router } from 'express'
const router = Router()
import { showMyProfile, getAllProfiles, getProfileById, deleteProfile, updateProfile, updatePassword } from '../controllers/profileController.js'
import { register } from '../controllers/authController.js';

router.route('/me').get(express.json(), showMyProfile)
router.route('/')
    .get(getAllProfiles)
    .post(express.json(), register)

router.route('/:id')
    .get(getProfileById)
    .put(express.json(), updateProfile)
    .delete(deleteProfile)

router.route('/updatePassword').post(express.json(), updatePassword)

export { router as profileRoute }; 
