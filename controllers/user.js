const {User} = require("../models");
const {decrypt} = require("../helpers/bcrypt");
const {generateToken} = require("../helpers/jwt");

class UserController
{
    static register(req, res, next)
    {
        let {email, password} = req.body;
        let user = {email, password};

        User.create(user)
        .then(data =>
        {
            res.status(201).json({message : "User created"});
        })
        .catch(err =>
        {
            return next(err);
        })
    }

    static login(req, res, next)
    {
        let {email, password} = req.body;

        User.findOne({where : {email}})
        .then(data =>
        {
            if(!data)
                return res.status(204).json({message : "Invalid email / password"});
            if(!decrypt(password, data.password))
                return res.status(204).json({message : "Invalid email / password"});

            req.headers.token = generateToken(data.id);
            return res.status(200).json({token : req.headers.token});
        })
        .catch(err =>
        {
            return next(err);
        });
    }

    static googleSign(req, res, next)
    {

    }
}

module.exports = UserController;