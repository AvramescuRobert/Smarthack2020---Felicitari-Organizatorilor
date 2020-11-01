import {IUser} from '../shared/interfaces/IUser';
import {IUserDetails} from "../shared/interfaces/IUserDetails";

const {validationResult} = require('express-validator');
const HttpError = require('../../dist/models/http-error');
const userService = require('../../dist/services/user-service');

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 301));
    }

    const {email, password, firstName, lastName} = req.body;

    let existingUser;
    try {
        existingUser = await userService.findUserByEmail(email);
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead',
            422
        );
        return next(error);
    }

    let createdUser;
    try {
        createdUser = await userService.createUser(email, password, firstName, lastName);
        const createdUserId = createdUser._id.toString();
    } catch (err) {
        const error = new HttpError('Creating user failed, please try again', 500);
        return next(error);
    }

    let token;
    try {
        token = userService.createToken(createdUser);
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later', 500);
        return next(error);
    }

    const response: IUser = {
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
        schoolId: createdUser.schoolId,
        token
    };
    res.status(201)
        .json(response);
};

const login = async (req, res, next) => {
    const {email, password} = req.body;
    let validCredentials;
    let token;
    let user;

    try {
        validCredentials = await userService.checkPassword(email, password);
    } catch (err) {
        return next(new HttpError('Invalid credentials, please check your inputs.', 401));
    }

    if (validCredentials) {
        try {
            user = await userService.findUserByEmail(email);
            token = await userService.createToken(user);
            console.log(user.school);
        } catch (err) {
            const error = new HttpError('Logging in failed, please try again later', 500);
            return next(error);
        }
    } else {
        const error = new HttpError('Invalid credentials, could not log in', 401);
        return next(error);
    }

    const response: IUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.school,
        token
    };
    res.status(201)
        .json(response);
};

const userDetails = async (req, res, next) => {
    const {userId} = req.body;
    let user;
    let userStatusesInMonth;

    try {
        user = await userService.findUserById(userId);
        userStatusesInMonth = await userService.getUserStatusesInMonth(userId);
    } catch(err) {
        const error = new HttpError('Could not retrieve user details', 400);
        return next(error);
    }

    const response: IUserDetails = {
        user: user,
        userStatusesPerDayInMonth: userStatusesInMonth
    };
    res.status(200).json(response);
};

const updateStatusForCurrentDay = async (req, res, next) => {
    const {userId, newStatusName} = req.body;
    let newStatus;
    try {
        newStatus = await userService.updateStatusForCurrentDayService(userId, newStatusName);
    } catch(err) {
        const error = new HttpError('Updating status for current day failed, please try again', 500);
        return next(error);
    }

    res.status(201).json(newStatus);
};

exports.signup = signup;
exports.login = login;
exports.userDetails = userDetails;
exports.updateStatusForCurrentDay = updateStatusForCurrentDay;
