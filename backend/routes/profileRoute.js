import express, { Router } from 'express'
const router = Router()
import { showMyProfile, getAllProfiles, getProfileById, deleteProfile, updateProfile, updatePassword } from '../controllers/profileController.js'
import { register } from '../controllers/authController.js';
 
router.route('/').get(getAllProfiles).post(express.json(), register)
router.route('/myProfile').get(express.json(), showMyProfile)
router.route('/updatePassword').post(express.json(), updatePassword)
router.route('/:id').get(getProfileById).put(express.json(), updateProfile).delete(deleteProfile)

export { router as profileRoute }; 
