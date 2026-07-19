import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    connection.query(
        ' INSERT INTO users (email, password, username) VALUES (?,?,?)',
        [email, hashPassword, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error creating user');
            }
            return res.send('User created successfully');
        },
    );
};

const getUserList = async () => {
    let users = [];
    //create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: process.env.PORT_DB,
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    // connection.query('SELECT * FROM users', function (err, results, fields) {
    //     if (err) {
    //         console.log(err);
    //         return users;
    //     }
    //     users = results;
    //     return users;
    // });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    createNewUser,
    getUserList,
};
