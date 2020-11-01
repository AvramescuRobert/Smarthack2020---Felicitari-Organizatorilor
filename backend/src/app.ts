import userRouter from './routes/user-routes';
import adminRouter from "./routes/admin-routes";
import classRouter from "./routes/class-routes";
import schoolRouter from './routes/school-routes';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use('/api/users', userRouter);
app.use('/api/classes', classRouter);
app.use('/api/schools', schoolRouter);
app.use('/api/admin', adminRouter);

app.use((req, res, next) => {
    throw new HttpError('Could not find this route', 404);
});

mongoose
    .connect(`mongodb+srv://echipa:castigatori@cluster0-rvl0b.mongodb.net/smarthack?retryWrites=true&w=majority`, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('good db connection');
        app.listen(8000);
    })
    .catch(err => {
        console.log(err);
    });

export {};
