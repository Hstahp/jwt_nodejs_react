import express from 'express';

import {
    handleDeleteUser,
    handleCreateNewUser,
    handleHome,
    handleUserPage,
    getUpdateUserPage,
    handleUpdateUser,
} from '../controllers/homeController.js';
import { testApi } from '../controllers/apiController.js';

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
    router.get('/update-user/:id', getUpdateUserPage);
    router.post('/user/update-user', handleUpdateUser);

    //rest api
    router.get('/api/test-api', testApi);

    return app.use('/', router);
};

export default initWebRoutes;
