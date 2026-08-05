import db from '../models/index';
import { checkEmailExist, checkPhoneExist, hashUserPassword } from './loginRegisterService';
const getAllUser = async () => {
    let data = {
        EM: '',
        EC: '',
        DT: '',
    };
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email'],
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
            EC: -1,
            DT: [],
        };
    }
};

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'phone', ['sex', 'gender'], 'address'],
            include: { model: db.Group, attributes: ['id', 'name', 'description'] },
            order: [['id', 'DESC']],
        });
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        };
        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data,
        };
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
        // Validate email presence and format
        if (!data.email) {
            return {
                EM: 'Email is required',
                EC: 1,
                DT: 'email',
            };
        }
        let regxEmail = /\S+@\S+\.\S+/;
        if (!regxEmail.test(data.email)) {
            return {
                EM: 'Please enter a valid email address',
                EC: 1,
                DT: 'email',
            };
        }

        // Validate phone presence and format
        if (!data.phone) {
            return {
                EM: 'Phone is required',
                EC: 1,
                DT: 'phone',
            };
        }
        let regxPhone = /^[0-9]{10,11}$/;
        if (!regxPhone.test(data.phone)) {
            return {
                EM: 'Please enter a valid phone number (10-11 digits)',
                EC: 1,
                DT: 'phone',
            };
        }

        //check email/phoneNumber are exist
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1,
                DT: 'email',
            };
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already exist',
                EC: 1,
                DT: 'phone',
            };
        }
        //hash user password
        let hashPassword = hashUserPassword(data.password);

        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: 'Create user success',
            EC: 0,
            DT: [],
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with service',
            EC: -1,
            DT: [],
        };
    }
};

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Error with empty GroupId',
                EC: 1,
                DT: 'group',
            };
        }

        let user = await db.User.findOne({
            where: { id: data.id },
        });
        if (user) {
            await user.update({
                username: data.username,
                sex: data.gender,
                address: data.address,
                groupId: data.groupId,
            });
            return {
                EM: 'Update user success',
                EC: 0,
                DT: '',
            };
        } else {
            //not found
            return {
                EM: 'User not found',
                EC: 2,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with service',
            EC: -1,
            DT: [],
        };
    }
};

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id },
        });
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete user success',
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: 'User not found',
                EC: 1,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with service',
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUserWithPagination,
};
