require('dotenv').config();
require('./db/conn');
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const requireAuth = require('./middleware/auth');
const Register = require("./models/registers");
const { Beginner, Intermediate, Advance } = require("./models/courses");

const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
console.log(process.env.SECRET_KEY);
app.get('/', (req, res) => {
    const isAuthenticated = req.cookies.jwt ? true : false;
    res.render("index", { isAuthenticated });
})
app.get('/home', requireAuth, (req, res) => {
    const isAuthenticated = req.cookies.jwt ? true : false;
    res.render('index', { isAuthenticated });
})


app.get('/register', (req, res) => {
    res.render("register");
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/instrumental', requireAuth, (req, res) => {
    const isAuthenticated = req.cookies.jwt ? true : false;
    res.render('instrumental', { isAuthenticated });
})
app.get('/tabla', requireAuth, (req, res) => {
    const isAuthenticated = req.cookies.jwt ? true : false;
    res.render('tabla', { isAuthenticated });
});
app.get('/tablaBeginner', requireAuth, (req, res) => {
    const isAuthenticated = req.cookies.jwt ? true : false;
    res.render('tablaBeginner', { isAuthenticated });
})
app.get('/tablaCourseBeg', requireAuth, (req, res) => {
    const isAuthenticated = req.cookies.jwt ? true : false;
    res.render('tablaCourseBeg', { isAuthenticated });
})
app.get('/tablaCourseInt', requireAuth, (req, res) => {
    const isAuthenticated = req.cookies.jwt ? true : false;
    res.render('tablaCourseInt', { isAuthenticated });
});
app.get('/profile', requireAuth, async (req, res) => {
    try {
        const isAuthenticated = req.cookies.jwt ? true : false;
        const id = req.cookies.info;
        const user = await Register.findOne({ email : id });
        if (user) {
            res.render('profile', { isAuthenticated, user });
        }
    }
    catch(err) {
        res.send("invalid");
    }
    
})
app.get('/editProfile', requireAuth, async (req, res) => {
    try {
        const isAuthenticated = req.cookies.jwt ? true : false;
        const email = req.cookies.info;
        const user = await Register.findOne({ email });
        if (user) {
            res.render('editProfile', { isAuthenticated, user });
        }
    }
    catch (err) {
        res.send(err);
    }
});
app.get('/logout', (req, res) => {
    try {
        res.clearCookie('jwt');
        res.clearCookie('info');
        res.redirect('/');
    }
    catch(err) {
        res.render('/error', {error : '*Technical problem moving you to main page'});
    }
    
})

app.post('/register', async (req, res) => {

    try {
        const email = req.body.email;
        const existingUser = await Register.findOne({ email: email });
        if (existingUser) {
            return res.render('register', { error: '*This Email already exists. Please use a different email or login.' });
        }
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        if (password !== cpassword) {
            return res.render('register', { error: '*Password and confirm password is not matching.' });
        }
        if (req.body.mobile.length != 10) {
            return res.render('register', { error: '*Mobile number should be of length 10' })
        }
        const registerUser = new Register({
            firstname: req.body.fname,
            lastname: req.body.lname,
            email: req.body.email,
            age: req.body.age,
            mobile: req.body.mobile,
            password: req.body.password,
            confirmPassword: req.body.password
        });

        // Implementing Password Hashing using BcryptJs
        const token = await registerUser.generateAuthToken();
        console.log(token);

        // Create cookie
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 30000),   // Expire cookie time
            httpOnly: true
        });
        res.cookie('info', email, { maxAge: 900000, httpOnly: true });
        const registered = await registerUser.save();
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;
        const existingUser = await Register.findOne({ email: email });
        const isMatch = await bcrypt.compare(pass, existingUser.password)

        if (isMatch) {
            const token = await existingUser.generateAuthToken();
            console.log("Login: " + token);

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 500000),
                httpOnly: true,
            });
            res.cookie('info', email, { maxAge: 900000, httpOnly: true });
            console.log(req.cookies.info)
            console.log(req.cookies.jwt);
            res.redirect('/home');
        }
        else {
            res.send("Login Failed, Bad Credentials");
        }
    }
    catch (error) {
        res.status(500).send("Login Failed, Bad Credentials");
    }
})

app.post('/courses', async (req, res) => {
    try {
        console.log(req.cookies.info);
        const email = req.cookies.info; // Assuming you're storing user email in a cookie
        const course = req.body.course;
        const level = req.body.level;
        const package = req.body.package;

        let CourseModel;
        switch (level.toLowerCase()) {
            case 'beginner':
                CourseModel = Beginner;
                break;
            case 'intermediate':
                CourseModel = Intermediate;
                break;
            case 'advance':
                CourseModel = Advance;
                break;
            default:
                return res.status(400).send('Invalid level provided');
        }

        let userDetails = await CourseModel.findOne({ email: email });
        if (userDetails) {
            if (userDetails.course === course)
                return res.render('error', { error: '*You have already registered for this course. Redirecting to the main page...' });
        }
        userDetails = new CourseModel({
            course: course,
            level: level,
            package: package,
            email: email,
            firstname: req.body.fname,
            lastname: req.body.lname,
            age: req.body.age,
            mobile: req.body.mobile,
            joiningDate: req.body.date,
            timings: req.body.time,
            img: req.body.img
        });
        await userDetails.save();
        res.redirect('/myClassroom');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/myPathshala', requireAuth, async (req, res) => {
    try {
        const userEmail = req.cookies.info;
        const userDetail = await Register.find({ email: userEmail });
        const beginnerCourses = await Beginner.find({ email: userEmail });
        const intermediateCourses = await Intermediate.find({ email: userEmail });
        const advanceCourses = await Advance.find({ email: userEmail });
        if (beginnerCourses && intermediateCourses && advanceCourses && userDetail)
            res.render('pathshala', {
                userDetail: userDetail,
                beginnerCourses: beginnerCourses,
                intermediateCourses: intermediateCourses,
                advanceCourses: advanceCourses
            });
    } catch (err) {
        res.send(err);
    }
});

app.post('/editProfile', async (req, res) => {
    const email = req.cookies.info;
    const newData = {
        firstname: req.body.fname,
        lastname: req.body.lname,
        age: req.body.age,
        mobile: req.body.mobile
    };

    try {
        const user = await Register.findOne({ email });
        if (!user) {
            return res.redirect('/login');
        }

        const result = await Register.updateOne({ email }, { $set: newData });
        if (result.nModified === 0) {
            return res.status(404).send('Data unchanged');
        }
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})


