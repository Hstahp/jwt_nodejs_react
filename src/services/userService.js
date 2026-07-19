import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: process.env.PORT_DB,
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            ' INSERT INTO users (email, password, username) VALUES (?,?,?)',
            [email, hashPassword, username],
        );
        return rows;
    } catch (e) {
        console.log('>>Check error: ', e);
    }
};

const getUserList = async () => {
    //create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: process.env.PORT_DB,
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (e) {
        console.log('>>Check error: ', e);
    }
};

const deleteUser = async (id) => {
    //create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: process.env.PORT_DB,
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
        return rows;
    } catch (e) {
        console.log('>>Check error: ', e);
    }
};

const getUserById = async (id) => {
    //create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: process.env.PORT_DB,
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows;
    } catch (e) {
        console.log('>>Check error: ', e);
    }
};

const updateUserInfor = async (username, email, id) => {
    //create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: process.env.PORT_DB,
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute('UPDATE users SET username = ? , email = ? WHERE id =?  ', [
            username,
            email,
            id,
        ]);
        return rows;
    } catch (e) {
        console.log('>>Check error: ', e);
    }
};
module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor,
};
