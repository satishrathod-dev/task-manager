const userModel = require('../model/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const blacklistTokenModel = require('./../models/blacklistToken.model');

module.exports.authuser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        next();
    }
    catch(error){
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

