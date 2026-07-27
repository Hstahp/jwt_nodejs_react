import db from '../models/index';

const getAllUser = async () => {
    let data = {
        EM: '',
        EC: '',
        DT: '',
    };
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email'],
            include: { model: db.Group, attributes: ['id', 'name', 'description'] },
        });
        if (users) {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: users,
            };
        } else {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with service',
            EC: '-1',
            DT: [],
        };
    }
};

const createNewUser = async (data) => {
    try {
        await db.User.create({});
    } catch (e) {
        console.log(e);
    }
};

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id },
        });
        if (user) {
            user.save({});
        } else {
            //not found
        }
    } catch (e) {
        console.log(e);
    }
};

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: { id: id },
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
};
