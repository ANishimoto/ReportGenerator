import { DataTypes } from 'sequelize';
import AbstractModel from './AbstractModel.js';

export default class TemplateTypeModel extends AbstractModel {
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
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                createdAt: {
                    type: DataTypes.DATE,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                }
            },
            options: {
                modelName: 'TemplateType',
                tableName: 'TemplatesTypes',
                underscored: true,
            }
        };
        if (connection)
            params.connection = connection;

        const model = super.init(params);
        
        return model;
    }
}