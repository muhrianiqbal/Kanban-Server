const {Task, User, Organization} = require("../models");

class TaskController
{
    static showAll(req, res, next)
    {
        let name = req.organization;

        Organization.findAll({where : {name}, include : Task})
        .then(data => 
        {
            return res.status(200).json(data);
        })
        .catch(err =>
        {
            return next(err);
        })
    }

    static add(req, res, next)
    {
        let {title, category, description} = req.body;
        let task = {title, category, description};

        Task.create(task)
        .then(data =>
        {
            let UserId = req.user_id;
            let TaskId = data.id;
            let name = req.organization;
            return Organization.create({name, UserId, TaskId});
        })
        .then(data =>
        {
            return res.status(200).json(data);
        })
        .catch(err =>
        {
            return next(err);
        })
    }

    static update(req, res, next)
    {
        let {title, category, description} = req.body;
        let task = {title, category, description};
        let {id} = req.params;

        Task.update(task, {where : {id}})
        .then(() =>
        {
            return res.status(200).json(task);
        })
        .catch(err =>
        {
            return next(err);
        })
    }

    static delete(req, res, next)
    {
        let {id} = req.params;

        Task.destroy({where : {id}})
        .then(() =>
        {
            let TaskId = id;
            return Organization.destroy({where : {TaskId}})
        })
        .then(() =>
        {
            return res.status(200).json({message : "Task successfully deleted"});
        })
        .catch(err =>
        {
            return next(err);
        })
    }
}

module.exports = TaskController;