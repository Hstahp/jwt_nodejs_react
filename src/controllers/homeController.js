const handleHome = (req, res) => {
    return res.render('home.ejs');
};

const handleUser = (req, res) => {
    return res.render('user.ejs');
};

export { handleHome, handleUser };
