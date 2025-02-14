const userModel = require('../model/user.model');
const {validationResult} = require('express-validator');
const userService = require('../service/userService');

console.log(userModel)
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;

    const isAlready = await userModel.findOne({email});
    console.log(req.body.email)

    console.log(isAlready)

    if(isAlready){
        return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullname.firstName,
        firstName: fullname.lastName,
        email,
        password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({message: "User created", user, token});
}

