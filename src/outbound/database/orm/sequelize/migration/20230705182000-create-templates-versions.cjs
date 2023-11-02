'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            'TemplatesVersions',
            {
                id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    autoIncrement: false,
                    primaryKey: true,
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                status: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                template_id: {
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
        await queryInterface.dropTable('TemplatesVersions');
    }
}