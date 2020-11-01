// @ts-ignore
const HttpError = require('../../dist/models/http-error');
const classService = require('../../dist/services/class-service');


const updateClassStatus = async (req, res, next) => {
    const courseToUpdate = req.params.courseId;
    const newStatus = req.params.newStatus;

    try {
        const course = await classService.updateClassSts(courseToUpdate, newStatus);
        console.log(course)

    } catch (err) {
        return next(new HttpError(err.message, err.statusCode));
    }

    res.status(201).json({ courseToUpdate
    });

};

const getStudents = async (req, res, next) =>{
    const clsId = req.params.classId;
    let students;
    try {
        students = await classService.getAllStudentsByClassId(clsId);
        console.log(students)

    } catch (err) {
        return next(new HttpError(err.message, err.statusCode));
    }

    res.status(201).json({ students
    });

}

//exports.getAllClasses = getAllClasses;
exports.updateClassStatus = updateClassStatus;
exports.getStudents = getStudents;