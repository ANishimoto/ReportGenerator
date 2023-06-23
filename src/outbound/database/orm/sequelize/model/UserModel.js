import { DataTypes } from 'sequelize';
import AbstractModel from './AbstractModel.js';

export default class UserModel extends AbstractModel {
    static init() {
        return super.init(
            {
                attributes: {
                    id: {
                        type: DataTypes.UUID,
                        autoIncrement: false,
                        primaryKey: true,
                        defaultValue: DataTypes.UUIDV4,
                        allowNull: false
                    },
                    login: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    password: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    status: {
                        type: DataTypes.TINYINT,
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
                    modelName: 'User',
                    tableName: 'Users',
                    underscored: true,
                }
            }
        );
    }
}