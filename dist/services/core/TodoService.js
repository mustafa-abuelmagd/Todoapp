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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// import * as ERRORS from '../../helpers/errors/Errors'
const BaseService_1 = require("../BaseService");
const Errors_1 = require("../../helpers/errors/Errors");
const index_1 = require("../../helpers/errors/index");
class TodoService extends BaseService_1.BaseService {
    createTodo(todo, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId)
                    throw new Errors_1.BusinessError(index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE, index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME, index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS, index_1.BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG);
                const ToDo = yield prisma.todo.create({
                    data: {
                        name: todo.name,
                        is_done: todo.is_done || false,
                        details: todo.details || '',
                        User: {
                            connect: {
                                id: userId,
                            }
                        }
                    },
                });
                return ToDo;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getAllToDos(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_todos = yield prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                    select: {
                        todos: true
                    }
                });
                return user_todos.todos;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getTodoById(UserId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield prisma.todo.findMany({
                    where: {
                        id: id,
                        userId: UserId
                    }
                });
                if (res) {
                    return res[0];
                }
                else {
                    if (!UserId)
                        throw new Errors_1.BusinessError(index_1.BUSINESS_ERROR_MSG.DEFAULT_VALIDATION_ERROR.CODE, index_1.BUSINESS_ERROR_MSG.DEFAULT_VALIDATION_ERROR.NAME, index_1.BUSINESS_ERROR_MSG.DEFAULT_VALIDATION_ERROR.STATUS, index_1.BUSINESS_ERROR_MSG.DEFAULT_VALIDATION_ERROR.MSG);
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateTodoById(UserId, id, updatedTodo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield prisma.todo.updateMany({
                    where: {
                        id: id,
                        userId: UserId
                    },
                    data: {
                        name: updatedTodo.name,
                        is_done: updatedTodo.is_done,
                        details: updatedTodo.details,
                    }
                });
                if (res.count === 1) {
                    return this.getTodoById(UserId, id);
                }
                else {
                    throw new Errors_1.BusinessError(index_1.BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.CODE, index_1.BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.NAME, index_1.BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.STATUS, index_1.BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.MSG);
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteOneById(id, UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield prisma.todo.deleteMany({
                    where: {
                        id: id,
                        userId: UserId
                    },
                });
                if (res.count === 1) {
                    return "Item deleted";
                }
                else {
                    throw new Errors_1.BusinessError(index_1.BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.CODE, index_1.BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.NAME, index_1.BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.STATUS, index_1.BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.MSG);
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.TodoService = TodoService;
// module.exports = new TodoService();
