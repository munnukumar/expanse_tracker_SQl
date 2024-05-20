const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(id, name) {
    return jwt.sign({ id: id, name: name }, process.env.JWT_ACCESS_TOKEN);
}

exports.signup = async(req, res) =>{
    try {
        const {name, email, password, mobile_No} = req.body
        const saltRound = 10;
        const hash = await bcrypt.hash(password, saltRound);

        const user = await User.create({
            name : name,
            email: email,
            password: hash,
            mobile_No: mobile_No
        })
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const findUser = await User.findOne({where: {email:email}});
        if(!findUser){
            console.log("&&&&&&&")
            return res.status(400).json({
                message: 'user not found'
            });
        }

        const comparePassword = await bcrypt.compare(password, findUser.password);
        if(!comparePassword){
            return res.status(404).json({
                message: 'email or password are wrong'
            });
        }
        res.status(200).json({
            message:'user login successfully',
            token: generateAccessToken(findUser.id, findUser.name)
        });
    }

    catch(err){
        res.status(500).json({message:"something went wrong", err:err})
    }
}
