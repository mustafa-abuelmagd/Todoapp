"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TodoService_1 = require("../../services/core/TodoService");
const UserService_1 = require("../../services/core/UserService");
const index_1 = require("../../helpers/validation/index");
// const express = require('express')
const BaseController_1 = require("../BaseController");
const router = express_1.default.Router();
// module.exports = app => {
//     const router = require('express').Router();
const _UserService = new UserService_1.UserService();
const _TodoService = new TodoService_1.TodoService();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newTodo = req.body;
        (_a = yield req.validate) !== null && _a !== void 0 ? _a : req.validate(index_1.todoSchema, newTodo);
        const UserId = req.user_id;
        const user = yield _UserService.getUserById(UserId);
        if (!user) {
            throw new Error("User not found");
        }
        const createdTodo = yield _TodoService.createTodo(newTodo, user.id);
        res.status(201).json(createdTodo);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const UserId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const user = yield _UserService.getUserById(UserId);
        if (!user) {
            throw new Error("User not found");
        }
        const ToDos = yield _TodoService.getAllToDos(user.id);
        res.json(ToDos);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const UserId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const user = yield _UserService.getUserById(UserId);
        if (!user) {
            throw new Error("User not found");
        }
        const id = req.params.id;
        const todo = yield _TodoService.getTodoById(UserId, id);
        if (todo) {
            res.json(todo);
        }
        else {
            throw new Error('Todo not found');
        }
    }
    catch (error) {
        next(error);
    }
}));
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const updatedTodo = req.body;
        yield req.validate(index_1.todoSchema, updatedTodo);
        const UserId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
        const user = yield _UserService.getUserById(UserId);
        if (!user) {
            throw new Error("User not found");
        }
        const id = req.params.id;
        const updated = yield _TodoService.updateTodoById(UserId, id, updatedTodo);
        if (updated) {
            res.json(updated);
        }
        else {
            throw new Error('Todo not found');
        }
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const UserId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
        const user = yield _UserService.getUserById(UserId);
        if (!user) {
            throw new Error("User not found");
        }
        const id = req.params.id;
        const deleted = yield _TodoService.deleteOneById(id, UserId);
        console.log("updated", deleted);
        if (deleted) {
            res.json(deleted);
        }
        else {
            throw new Error('Todo not found');
        }
    }
    catch (error) {
        next(error);
    }
}));
// app.use("/todos", router);
// }
module.exports = new BaseController_1.BaseController('/todos', 'private', router);
