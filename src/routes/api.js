import express from 'express';

import { testApi, handleRegister, handleLogin } from '../controllers/apiController';
import userController from '../controllers/userController';
import groupController from '../controllers/groupController';
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

    router.get('/user/read', userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);

    router.get('/group/read', groupController.readFunc);
    return app.use('/api/v1', router);
};

export default initAPIRoutes;
