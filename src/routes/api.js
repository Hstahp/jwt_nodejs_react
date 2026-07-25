import express from 'express';

import { testApi, handleRegister, handleLogin } from '../controllers/apiController.js';

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

    return app.use('/api/v1', router);
};

export default initAPIRoutes;
