const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api',
    });
};

const handleRegister = (req, res) => {
    console.log('check body:', req.body);
    return res.status(200).json({
        message: 'ok',
        data: 'test api',
    });
};
module.exports = {
    testApi,
    handleRegister,
};
