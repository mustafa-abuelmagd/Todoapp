import express, {Application, Express, Request, Response, NextFunction} from 'express';
// import * as _ from 'lodash' ;
const _ = require('lodash');
import {TodoService} from '../../services/core/TodoService';
import {UserService} from '../../services/core/UserService';
import {todoSchema} from "../../helpers/validation";
// const express = require('express')
import {BaseController} from "../BaseController";

const router = express.Router();
// module.exports = app => {
//     const router = require('express').Router();

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newTodo = req.body;
        await req.validate?? req.validate(todoSchema, newTodo);

        const UserId = req.user_id;
        const user = await UserService.getUserById(UserId);

        if (!user) {
            throw new Error("User not found")
        }
        const createdTodo = await TodoService.createTodo(newTodo, user.id);
        res.status(201).json(createdTodo);
    } catch (error) {
        next(error)
    }
});
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const UserId = req.user?.id;
        const user = await UserService.getUserById(UserId);
        if (!user) {
            throw new Error("User not found")
        }

        const ToDos = await TodoService.getAllToDos(user.id);
        res.json(ToDos);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const UserId = req.user?.id;
        const user = await UserService.getUserById(UserId);
        if (!user) {
            throw new Error("User not found")
        }

        const id = req.params.id;
        const todo = await TodoService.getTodoById(UserId, id);
        if (todo) {
            res.json(todo);
        } else {
            throw new Error('Todo not found')
        }
    } catch (error) {
        next(error);
    }
});


router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedTodo = req.body;
        await req.validate(todoSchema, updatedTodo);

        const UserId = req.user?.id;
        const user = await UserService.getUserById(UserId);
        if (!user) {
            throw new Error("User not found")
        }

        const id = req.params.id;
        const updated = await TodoService.updateTodoById(UserId, id, updatedTodo);
        if (updated) {
            res.json(updated);
        } else {
            throw new Error('Todo not found')
        }
    } catch (error) {
        next(error);
    }
});
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const UserId = req.user?.id;
        const user = await UserService.getUserById(UserId);
        if (!user) {
            throw new Error("User not found")
        }

        const id = req.params.id;

        const deleted = await TodoService.deleteOneById(id);
        console.log("updated", deleted);

        if (deleted) {
            res.json(deleted);
        } else {
            throw new Error('Todo not found')

        }
    } catch (error) {
        next(error);
    }
});
// app.use("/todos", router);
// }
module.exports = new BaseController('/todos', 'private', router);