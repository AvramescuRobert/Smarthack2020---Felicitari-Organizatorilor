import {sendClosingSchoolEmail, sendSchoolStatsEmail} from "../services/email-service";

const userService = require('../../dist/services/user-service');

const sendStats = async (req, res, next) => {
    await sendSchoolStatsEmail({
        locales: {
            name: "Johhny Test",
        },
        receiver: "cristina.matei@asmi.ro",
    });
    res.status(201).json({});
};

const closeSchoolAlert = async (req, res, next) => {
    const {schoolId} = req.body;
    const users = await userService.getAllUsersBySchoolId(schoolId);
    Promise.all(await users.map(async (u) => {
        await sendClosingSchoolEmail({
            locales: {
                name: u.firstName + " " + u.lastName,
            },
            receiver: u.email,
        });
    }));

    res.status(201).json({});
};

exports.sendStats = sendStats;
exports.closeSchoolAlert = closeSchoolAlert;