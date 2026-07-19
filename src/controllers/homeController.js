import userService from '../services/userService';

const handleHome = (req, res) => {
    return res.render('home.ejs');
};

const handleUser = (req, res) => {
    return res.render('user.ejs');
};

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();

    return res.render('user.ejs', { userList });
};

const handleCreateNewUser = async (req, res) => {
    let email = req.body.emailName;
    let password = req.body.password;
    let username = req.body.username;

    await userService.createNewUser(email, password, username);
    return res.redirect('/user');
};

const handleDeleteUser = async (req, res) => {
    let userId = req.params.id;
    await userService.deleteUser(userId);
    return res.redirect('/user');
};

export { handleHome, handleUser, handleCreateNewUser, handleUserPage, handleDeleteUser };
