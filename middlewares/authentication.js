let {verify} = require("../helpers/jwt");
let {User} = require("../models");

function authentication(req, res, next)
{
    try {
        let {token} = req.headers;
        let id = verify(token);

        User.findByPk(id)
        .then(data =>
        {
            if(!data)
                return res.status(204).json({message : "You must login"});
            req.user_id = data.id;
            req.organization = data.organization;
            return next();
        })
      } catch(err) {
        return next(err);
      }
}

module.exports = authentication;