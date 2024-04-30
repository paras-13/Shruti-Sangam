const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    
    course : {
        type : String,
        required : true
    },
    level : {
        type : String,
        required : true
    },
    package : {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    timings: {
        type: String,
        required: true
    },
    img : {
        type:String,
    },
    isChecked : {
        type:String,
        default: 'No'
    }
});

const Beginner = new mongoose.model('Beginner', CourseSchema);
const Intermediate = new mongoose.model('Intermediate', CourseSchema);
const Advance = new mongoose.model('Advance', CourseSchema);

module.exports = {Beginner, Intermediate, Advance};