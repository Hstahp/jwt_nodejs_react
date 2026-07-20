'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'User',
            [
                {
                    username: 'john@doe',
                    email: 'John Doe',
                    password: 'fake1',
                },
                {
                    username: 'john2@doe',
                    email: 'John Doe2',
                    password: 'fake2',
                },
                {
                    username: 'john3@doe',
                    email: 'John Doe3',
                    password: 'fake3',
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('User', null, {});
    },
};
