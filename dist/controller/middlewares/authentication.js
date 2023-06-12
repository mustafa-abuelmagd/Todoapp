"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authentication = void 0;
const _ = __importStar(require("lodash"));
const jwt = __importStar(require("jsonwebtoken"));
const UserService_1 = require("../../services/core/UserService");
const index_1 = require("../../config/index");
const _UserService = new UserService_1.UserService();
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (authorization) {
        // @ts-ignore
        jwt.verify(authorization, index_1.config.auth.local.key, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err || _.isNil(decoded)) {
                next(new Error("UnauthenticatedError"));
            }
            try {
                const obj = decoded;
                const user = yield _UserService.getUserByEmail(obj);
                if (_.isNil(user)) {
                    const message = 'User account does not exist';
                    return next(new Error(message));
                }
                req.user = user;
                req.user_id = String(user.id);
                next();
            }
            catch (e) {
                next(new Error("Unauthorized to see this resource"));
            }
        }));
    }
    else {
        next(new Error("Unauthorized to see this resource"));
    }
});
exports.authentication = authentication;
