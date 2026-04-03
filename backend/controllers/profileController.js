import {StatusCodes} from 'http-status-codes'
import {User} from '../models/User.js'
import { createTokenUser } from '../utils/createTokenUser.js';
import { checkPermission } from '../utils/checkPermission.js';
import UnauthenticatedError from '../errors/unauthenticated.js';
import {isTokenValid} from '../utils/jwt.js'
import { decodeUser } from '../utils/decodeUser.js';

export const getNumOfProfiles = async (req, res) => {
    const count = await User.countDocuments();
    res.status(StatusCodes.OK).json({ count });
};

export const showMyProfile = async (req, res) => {
    const decodedUser = decodeUser(req)
    res.status(StatusCodes.OK).json(decodedUser)
}

export const getAllProfiles = async (req, res) => {
    const profiles = await User.find({}).select('-password');
    checkPermission(req)
    const tokenProfiles = profiles.map(profile => createTokenUser(profile))
    res.status(StatusCodes.OK).json({profiles: tokenProfiles, count: tokenProfiles.length });
};

export const getProfileById = async (req, res) => {
    const { id: profileId } = req.params;
    checkPermission(req, profileId)
    const profile = await User.findOne({ _id: profileId }).select('-password');
        
    if (!profile) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No profile with id ${profileId}` });
    }

    const tokenProfile = createTokenUser(profile);
    res.status(StatusCodes.OK).json({profile: tokenProfile });
};

export const updateProfile = async (req, res) => {
    const { id: profileId } = req.params;

    checkPermission(req, profileId)
    const {username, email} = req.body;

    const profile = await User.findOne({ _id: profileId });

    if (!profile) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No profile with id ${profileId}` });
    }
    if(username){
        profile.username = username;
    }
    if (email){
        profile.email = email;
    }

    await profile.save();

    const tokenProfile = createTokenUser(profile);
    res.status(StatusCodes.OK).json({profile: tokenProfile });
};

export const updatePassword = async (req, res) => {

    const decodedUser = decodeUser(req)

    const profileId = decodedUser.userId;
    
    const { oldPassword, newPassword } = req.body;

    checkPermission(req, profileId);

    if (!oldPassword || !newPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide both old and new password" });
    }

    const profile = await User.findOne({ _id: profileId });

    if (!profile) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No profile with id ${profileId}` });
    }

    // Verify the old password is correct
    const isPasswordCorrect = await profile.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Old Password");
    }

    profile.password = newPassword;
    await profile.save();

    res.status(StatusCodes.OK).json({ msg: "Success! Password updated." });
};

export const deleteProfile = async (req, res) => {
    const { id: profileId } = req.params;

    checkPermission(req, profileId)

    const profile = await User.findOneAndDelete({ _id: profileId });
    
    if (!profile) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No profile with id ${profileId}` });
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! Profile removed.' });
};