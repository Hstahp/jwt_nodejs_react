import userApiService from '../services/userApiService';

const readFunc = async (req, res) => {
    try {
        if (req.params.page && req.params.limit) {
            let page = req.params.page;
            let limit = req.params.limit;
            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } else {
            let data = await userApiService.getAllUser();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        });
    }
};

const createFunc = (req, res) => {
    try {
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        });
    }
};

const updateFunc = (req, res) => {
    try {
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        });
    }
};

const deleteFunc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        });
    }
};

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
};
