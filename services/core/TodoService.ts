const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
// import * as ERRORS from '../../helpers/errors/Errors'
import {BaseService} from "../BaseService";
import {BusinessError} from "../../helpers/errors/Errors";
import {BUSINESS_ERROR_MSG} from "../../helpers/errors/index";

type TodoType = { name: string, is_done: boolean, details: string }

export class TodoService extends BaseService {
    async createTodo(todo: TodoType, userId: string) {
        try {
            if (!userId) throw new BusinessError(
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.CODE,
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.NAME,
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.STATUS,
                BUSINESS_ERROR_MSG.USERS.USER_NOT_FOUND.MSG,
            );
            const ToDo = await prisma.todo.create({
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
        } catch (e) {
            throw e;
        }
    }

    async getAllToDos(userId: string) {
        try {
            const user_todos = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    todos: true
                }
            })
            return user_todos.todos;
        } catch (e) {
            throw e;
        }
    }

    async getTodoById(UserId: string | undefined, id: string) {
        try {
            let res = await prisma.todo.findMany({
                where: {
                    id: id,
                    userId: UserId
                }
            })

            if (res) {
                return res[0];
            } else {
                if (!UserId) throw new BusinessError(
                    BUSINESS_ERROR_MSG.DEFAULT_VALIDATION_ERROR.CODE,
                    BUSINESS_ERROR_MSG.DEFAULT_VALIDATION_ERROR.NAME,
                    BUSINESS_ERROR_MSG.DEFAULT_VALIDATION_ERROR.STATUS,
                    BUSINESS_ERROR_MSG.DEFAULT_VALIDATION_ERROR.MSG,
                );
            }
        } catch (err) {
            throw err;
        }
    }

    async updateTodoById(UserId: string | undefined, id: string, updatedTodo: TodoType) {
        try {
            let res = await prisma.todo.updateMany({
                where: {
                    id: id,
                    userId: UserId
                },
                data: {
                    name: updatedTodo.name,
                    is_done: updatedTodo.is_done,
                    details: updatedTodo.details,
                }
            })

            if (res.count === 1) {
                return this.getTodoById(UserId, id);
            } else {
                throw new BusinessError(
                    BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.CODE,
                    BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.NAME,
                    BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.STATUS,
                    BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.MSG,
                );
            }
        } catch (err) {
            throw err;
        }
    }

    async deleteOneById(id: string, UserId: string | undefined) {
        try {

            let res = await prisma.todo.deleteMany({
                where: {
                    id: id,
                    userId: UserId
                },
            })
            if (res.count === 1) {
                return "Item deleted";
            } else {
                throw new BusinessError(
                    BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.CODE,
                    BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.NAME,
                    BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.STATUS,
                    BUSINESS_ERROR_MSG.TODOS.TODO_NOT_FOUND.MSG,
                );
            }
        } catch (err) {
            throw err;
        }
    }
}

// module.exports = new TodoService();




