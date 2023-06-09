const fs = require('fs');
const path = require('path');
const express = require('express');
const { authentication, hooks, language } = require('../controller/middlewares');
const controllerDir = '../controller/src';

class Router {
    constructor(app, config) {
        this.app = app;
        this.config = config;
    }

    initialize() {
        this.app.use(function (req, res, next) {

            res.setHeader('Access-Control-Allow-Origin', '*');

            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });

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

        const files = fs.readdirSync(dir);
        for (let i = 0; i < files.length; i++) {
            const controllerDir = path.join(dir, files[i]);
            if (fs.lstatSync(controllerDir).isDirectory()) {
                this.getControllers(controllerDir, privateControllers, publicControllers);
            } else {
                const controller = require(controllerDir);
                if (controller.type === 'private') {
                    privateControllers.push(controller);
                } else {
                    publicControllers.push(controller);
                }
            }
        }
    }

    injectControllers(controllers) {
        for (let i = 0; i < controllers.length; i++) {
            this.app.use(controllers[i].url, controllers[i].router);
        }
    }




}

module.exports = Router;