const jwt = require('jsonwebtoken');
const Register = require('../models/registers');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.render('login', { error: 'Please log in or register to continue.' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.render('login', { error: 'Please log in or register to continue.' });
        }
        next();
    });
};


module.exports = requireAuth;