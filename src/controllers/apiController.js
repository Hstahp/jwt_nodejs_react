import { registerNewUser, handleUserLogin } from '../services/loginRegisterService';

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api',
    });
};

const handleRegister = async (req, res) => {
    try {
        //req.body
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'missing required parameters', //error message
                EC: '1', //error code
                DT: '', //date
            });
        }

        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Your password must more than 3 characters',
                EC: '1',
                DT: '',
            });
        }

        //service: create user
        let data = await registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: '', //date
        });
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        });
    }
};

const handleLogin = async (req, res) => {
    try {
        let data = await handleUserLogin(req.body);
        //set cookie
        res.cookie('jwt', data.DT.access_token, { httpOnly: true });
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        });
    }
};

module.exports = {
    testApi,
    handleRegister,
    handleLogin,
};
