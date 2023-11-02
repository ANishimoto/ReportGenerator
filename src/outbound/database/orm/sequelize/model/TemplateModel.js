import { DataTypes } from 'sequelize';
import AbstractModel from './AbstractModel.js';
import TemplateTypeModel from './TemplateTypeModel.js';

export default class TemplateModel extends AbstractModel {
    static init({
        connection = null
    } = {}) {
        const params = {
            attributes: {
                id: {
                    type: DataTypes.UUID,
                    autoIncrement: false,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                templateTypeId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: TemplateTypeModel.init(),
                        key: 'id'
                    }
                },
                createdAt: {
                    type: DataTypes.DATE,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                }
            },
            options: {
                modelName: 'Template',
                tableName: 'Templates',
                underscored: true,
            }
        };
        if (connection)
            params.connection = connection;

        const model = super.init(params);

        return model;
    }
}