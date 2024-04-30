const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    
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
    timings: {
        type: String,
        required: true
    },
    img : {
        type : String
    }
});

const BeginnerCart = new mongoose.model('BeginnerCart', CartSchema);
const IntermediateCart = new mongoose.model('IntermediateCart', CartSchema);
const AdvanceCart = new mongoose.model('AdvanceCart', CartSchema);

module.exports = {BeginnerCart, IntermediateCart, AdvanceCart};