'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint(
            'TemplatesVersions', 
            {
                fields: ['template_id'],
                type: 'foreign key',
                name: 'fk_template_id',
                references: {
                    table: 'Templates',
                    field: 'id'
                }
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint(
            'TemplatesVersions',
            'fk_template_id'
        );
    }
}