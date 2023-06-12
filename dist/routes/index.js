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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const index_1 = require("../controller/middlewares/index");
const controllerDir = '../controller/src';
const authentication = index_1.middlewares.authentication;
const hooks = index_1.middlewares.hooks;
class Router {
    constructor(app, config) {
        this.router = express_1.default.Router();
        this.app = app;
        this.config = config;
    }
    initialize() {
        // this.app.use((req, res, next) => {
        //
        //     res.setHeader('Access-Control-Allow-Origin', '*');
        //
        //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        //
        //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //
        //     res.setHeader('Access-Control-Allow-Credentials', "true");
        //     next();
        // });
        this.app.use(hooks);
        const privateControllers = [];
        const publicControllers = [];
        const dir = path.join(__dirname, controllerDir);
        this.getControllers(dir, privateControllers, publicControllers);
        this.injectControllers(publicControllers);
        this.app.use(authentication);
        this.injectControllers(privateControllers);
    }
    getControllers(dir, privateControllers, publicControllers) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = fs.readdirSync(dir);
            for (let i = 0; i < files.length; i++) {
                const controllerDir = path.join(dir, files[i]);
                if (fs.lstatSync(controllerDir).isDirectory()) {
                    this.getControllers(controllerDir, privateControllers, publicControllers);
                }
                else {
                    const controller = require(`${controllerDir}`);
                    if (controller.type === 'private') {
                        privateControllers.push(controller);
                    }
                    else {
                        publicControllers.push(controller);
                    }
                }
            }
        });
    }
    injectControllers(controllers) {
        for (let i = 0; i < controllers.length; i++) {
            this.app.use(controllers[i].url, controllers[i].router);
        }
    }
}
exports.Router = Router;
