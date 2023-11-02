'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            'TemplatesTypes',
            {
                id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    autoIncrement: false,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                status: {
                    type: Sequelize.BOOLEAN,
                    allowNul: false,
                    defaultValue: true
                },
                created_at: {
                    type: 'TIMESTAMP',
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    allowNul: false,
                },
                updated_at: {
                    type: 'TIMESTAMP',
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    allowNul: false,
                }
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TemplatesTypes');
    }
}