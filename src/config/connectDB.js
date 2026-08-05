import Sequelize from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize('jwt', 'root', null, {
    host: '127.0.0.1',
    port: process.env.PORT_DB,
    dialect: 'mysql',
    logging: false,
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connecttion has been established successfully.');
    } catch (e) {
        console.error('Unable to connect to the database ', e);
    }
};

export default connection;
