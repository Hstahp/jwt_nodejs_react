import db from '../models/index';

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true,
        });
        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2));
        if (persists.length > 0) {
            await db.Role.bulkCreate(persists);
            return {
                EM: `Created roles success: ${persists.length} roles...`,
                EC: 0,
                DT: [],
            };
        }
        return {
            EM: 'No new roles to create',
            EC: 0,
            DT: [],
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something went wrong from service...',
            EC: -1,
            DT: [],
        };
    }
};

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll();

        return {
            EM: 'Get all Roles success',
            EC: 0,
            DT: data,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something went wrong from service...',
            EC: -1,
            DT: [],
        };
    }
};

const getRolesWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Role.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'url', 'description'],
            order: [['id', 'DESC']],
        });
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            roles: rows,
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
            EC: -1,
            DT: [],
        };
    }
};

const updateRole = async (data) => {
    try {
        if (!data.id) {
            return {
                EM: 'Error with empty id',
                EC: 1,
                DT: '',
            };
        }

        let role = await db.Role.findOne({
            where: { id: data.id },
        });
        if (role) {
            await role.update({
                url: data.url,
                description: data.description,
            });
            return {
                EM: 'Update role success',
                EC: 0,
                DT: '',
            };
        } else {
            //not found
            return {
                EM: 'Role not found',
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

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id },
        });
        if (role) {
            await role.destroy();
            return {
                EM: 'Delete role success',
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: 'Role not found',
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

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Not found any roles',
                EC: 0,
                DT: [],
            };
        }
        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: db.Role,
                    attributes: ['id', 'url', 'description'],
                    through: { attributes: [] },
                },
            ],
        });

        return {
            EM: 'Get Roles by Group success',
            EC: 0,
            DT: roles,
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

const assignRoleToGroup = async (data) => {
    try {
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId },
        });
        await db.Group_Role.bulkCreate(data.groupRoles);
        return {
            EM: 'Assign Roles to Group success',
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

module.exports = {
    createNewRoles,
    getAllRoles,
    getRolesWithPagination,
    updateRole,
    deleteRole,
    getRoleByGroup,
    assignRoleToGroup,
};
