import mysql from 'mysql2';

//create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    database: 'jwt',
});

const handleHome = (req, res) => {
    return res.render('home.ejs');
};

const handleUser = (req, res) => {
    return res.render('user.ejs');
};

const handleCreateNewUser = (req, res) => {
    let email = req.body.emailName;
    let password = req.body.password;
    let username = req.body.username;

    connection.query(
        ' INSERT INTO users (email, password, username) VALUES (?,?,?)',
        [email, password, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error creating user');
            }
            return res.send('User created successfully');
        },
    );

    return res.send('User created successfully');
};

export { handleHome, handleUser, handleCreateNewUser };
