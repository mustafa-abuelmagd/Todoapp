const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const ERRORS = require('../../helpers/errors/Errors')
const BaseService = require("../BaseService");
const {BusinessError} = require("../../helpers/errors/Errors");
const {BUSINESS_ERROR_MSG} = require("../../helpers/errors");

class TodoService extends BaseService {
    async createTodo(todo, userId) {
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
                    is_done: todo.isDone || false,
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

    async getAllToDos(userId) {
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

    async getTodoById(UserId, id) {
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
                if (!userId) throw new BusinessError(
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

    async updateTodoById(UserId, id, updatedTodo) {
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

    async deleteOneById(id, UserId) {
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

module.exports = new TodoService();


// exports.createTodo = async function (todo, userId) {
//     try {
//         if (!userId) throw new ERRORS.NotFoundError(null, null, null, "User not found")
//         // new Error("User not found");
//         const ToDo = await prisma.todo.create({
//             data: {
//                 name: todo.name,
//                 is_done: todo.isDone || false,
//                 details: todo.details || '',
//                 User: {
//                     connect: {
//                         id: userId,
//
//                     }
//                 }
//             },
//
//         });
//
//         return ToDo;
//     } catch (e) {
//         throw e;
//     }
// }
// exports.getAllToDos = async function (userId) {
//     try {
//         const user_todos = await prisma.user.findUnique({
//             where: {
//                 id: userId,
//             },
//             select: {
//                 todos: true
//             }
//         })
//         return user_todos.todos;
//     } catch (e) {
//         throw e;
//     }
// }
//
//
// exports.getTodoById = async function (UserId, id) {
//     try {
//         let res = await prisma.todo.findMany({
//             where: {
//                 id: id,
//                 userId: UserId
//             }
//         })
//
//         if (res) {
//             return res[0];
//         } else {
//             throw new Error("Todo not found");
//         }
//     } catch (err) {
//         throw err;
//     }
// }
//
// exports.updateTodoById = async function (UserId, id, updatedTodo) {
//     try {
//         let res = await prisma.todo.updateMany({
//             where: {
//                 id: id,
//                 userId: UserId
//             },
//             data: {
//                 name: updatedTodo.name,
//                 is_done: updatedTodo.is_done,
//                 details: updatedTodo.details,
//             }
//         })
//
//         if (res.count === 1) {
//             return this.getTodoById(UserId, id);
//         } else {
//             throw new Error("Todo not found");
//         }
//     } catch (err) {
//         throw err;
//     }
// }
//
// exports.deleteOneById = async function (id, UserId) {
//     try {
//
//         let res = await prisma.todo.deleteMany({
//             where: {
//                 id: id,
//                 userId: UserId
//             },
//         })
//         if (res.count === 1) {
//             return "Item deleted";
//         } else {
//             throw new Error("Todo not found");
//         }
//     } catch (err) {
//         throw err;
//     }
// }
//



