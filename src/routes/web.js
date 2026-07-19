import express from 'express';

import { handleCreateNewUser, handleHome, handleUserPage } from '../controllers/homeController.js';

const router = express.Router();

/**
 *
 * *
 *@param {*} app : express app
 */

const initWebRoutes = (app) => {
    router.get('/', handleHome);
    router.get('/user', handleUserPage);
    router.post('/user/create-user', handleCreateNewUser);
    return app.use('/', router);
};

export default initWebRoutes;
