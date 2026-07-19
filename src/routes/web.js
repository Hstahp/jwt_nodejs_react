import express from 'express';

import { handleDeleteUser, handleCreateNewUser, handleHome, handleUserPage } from '../controllers/homeController.js';

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
    router.post('/delete-user/:id', handleDeleteUser);
    return app.use('/', router);
};

export default initWebRoutes;
