const {Organization} = require("../models");

function authorization(req, res, next)
{
    let TaskId = req.params.id;

    Organization.findOne({where : {TaskId}})
    .then(data =>
    {
        if(!data)
            return res.status(204).json({message : "Task not found"});
        if(data.UserId != req.user_id)
            return res.status(401).json({error : "Unauthorized"});

        return next();
    })
    .catch(err =>
    {
        return next(err);
    })
}

module.exports = authorization;