import express from 'express';

import { testApi, handleRegister, handleLogin } from '../controllers/apiController.js';
import userController from '../controllers/userController.js';
const router = express.Router();

/**
 *
 * *
 *@param {*} app : express app
 */

const initAPIRoutes = (app) => {
    //rest api
    router.get('/test-api', testApi);
    router.post('/register', handleRegister);
    router.post('/login', handleLogin);

    router.get('/user/show', userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);

    return app.use('/api/v1', router);
};

export default initAPIRoutes;
