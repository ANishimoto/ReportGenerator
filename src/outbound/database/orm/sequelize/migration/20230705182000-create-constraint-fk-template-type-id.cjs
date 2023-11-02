'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint(
            'Templates', 
            {
                fields: ['template_type_id'],
                type: 'foreign key',
                name: 'fk_template_type_id',
                references: {
                    table: 'TemplatesTypes',
                    field: 'id'
                }
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint(
            'Templates',
            'fk_template_type_id'
        );
    }
}