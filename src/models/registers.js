const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String,
        required : true
    },
    country: {
        type : String,
        required : true
    },
    address: {
        type:String,
        default:"Fill your address"
    },
    instagram : {
        type:String,
        default : "Enter your Instagram handle"
    },
    facebook : {
        type:String,
        default : "Enter your Facebook handle"
    },
    twitter: {
        type:String,
        default : "Enter your Twitter handle"
    },
    youtube : {
        type:String,
        default : "Enter your Youtube channel"
    },
    profilePicture : {
        type : String,
        default : "Assets/images/profileico.png"
    }
});

// Generating tokens
userSchema.methods.generateAuthToken = async function() {
    try {
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        await this.save();
        return token;
    }
    catch(error) {
        res.send("The error part" + error);
        console.log("The error part " + error);
        
    }
}

// Converting password into hash
userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    if(this.isModified('confirmPassword')) {
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
    }
    next();

})
const Register = new mongoose.model("userDetail", userSchema);
module.exports = Register;