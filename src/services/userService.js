import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

//create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    database: 'jwt',
});

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

const getUserList = () => {
    let users = [];
    connection.query('SELECT * FROM users', function (err, results, fields) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving user list');
        }
        console.log('check user list: ', results);
    });
};

module.exports = {
    createNewUser,
};
