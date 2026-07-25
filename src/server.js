import express from 'express';

import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initAPIRoutes from './routes/api';

import bodyParser from 'body-parser';

import configCors from './config/cors';
// import connection from './config/connectDB';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

configCors(app);
//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
// connection();

//init web routes
initWebRoutes(app);
//init api routes
initAPIRoutes(app);

app.listen(PORT, () => {
    console.log(`>>>Backend Nodejs is running on the port: http://localhost:${PORT}`);
});

export default app;
//
