import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    try {
        await db.User.create({
            email: email,
            username: username,
            password: hashPassword,
        });
    } catch (e) {
        console.log('>>Check error: ', e);
    }
};

const getUserList = async () => {
    //test realtionships
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ['id', 'username', 'email'],
        include: { model: db.Group, attributes: ['id', 'name', 'description'] },
        raw: true,
        nest: true,
    });

    let roles = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true,
    });

    console.log('>> check new users: ', newUser);
    console.log('>> check new roles: ', roles);

    let users = [];
    users = await db.User.findAll();

    return users;
    //create the connection to database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     port: process.env.PORT_DB,
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user');
    //     return rows;
    // } catch (e) {
    //     console.log('>>Check error: ', e);
    // }
};

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId },
    });
    // //create the connection to database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     port: process.env.PORT_DB,
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id = ?', [id]);
    //     return rows;
    // } catch (e) {
    //     console.log('>>Check error: ', e);
    // }
};

const getUserById = async (userId) => {
    let user = {};

    user = await db.User.findOne({
        where: { id: userId },
    });

    return user;
    // //create the connection to database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     port: process.env.PORT_DB,
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
    //     return rows;
    // } catch (e) {
    //     console.log('>>Check error: ', e);
    // }
};

const updateUserInfor = async (username, email, id) => {
    await db.User.update(
        {
            email: email,
            username: username,
        },
        {
            where: { id: id },
        },
    );
    //create the connection to database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     port: process.env.PORT_DB,
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE user SET username = ? , email = ? WHERE id =?  ', [
    //         username,
    //         email,
    //         id,
    //     ]);
    //     return rows;
    // } catch (e) {
    //     console.log('>>Check error: ', e);
    // }
};
module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor,
};
