// @ts-ignore
const {validationResult} = require('express-validator');
// @ts-ignore
const HttpError = require('../../dist/models/http-error');
const schoolService = require('../../dist/services/school-service');

const getAllClasses = async (req, res, next) => {
    const schoolId = req.body.schoolId;

    let classes;
    try {

        classes = await schoolService.getAllClassesBySchool(schoolId);

    } catch (err) {
        return next(new HttpError(err.message, err.statusCode));
    }

    res.status(201).json({
        classes
    });
};

const updateSchoolStatus = async (req, res, next) => {
    const schoolToUpdate = req.params.schoolId;
    const newStatus = req.params.newStatus;

    try {
        console.log(newStatus)
        const school = await schoolService.updateSchoolSts(schoolToUpdate, newStatus);
        console.log(school)

    } catch (err) {
        return next(new HttpError(err.message, err.statusCode));
    }

    res.status(201).json({ schoolToUpdate
    });

};

const getSchoolById = async (req, res, next) => {
    const schoolId = req.body.schoolId;

    let school;
    try {

        school = await schoolService.getSchoolByIdService(schoolId);

    } catch (err) {
        return next(new HttpError(err.message, err.statusCode));
    }

    res.status(201).json({
        school
    });
};

const getStatistics = async(req, res, next) =>{
    console.log("here");
    const schoolId = req.body.schoolId;
    console.log(schoolId);
    let school;
    try {

        school = await schoolService.computeStatistics(schoolId);
        console.log(school)

    } catch (err) {
        return next(new HttpError(err.message, err.statusCode));
    }

    res.status(201).json({
        ...school
    });
}

exports.getAllClasses = getAllClasses;
exports.getSchoolById = getSchoolById;
exports.updateSchoolStatus = updateSchoolStatus;
exports.getStatistics = getStatistics;
