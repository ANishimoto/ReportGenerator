'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            'Templates',
            {
                id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    autoIncrement: false,
                    primaryKey: true,
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                status: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                template_type_id: {
                    type: Sequelize.UUID,
                    allowNull: false,
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
        await queryInterface.dropTable('Templates');
    }
}