import { DataTypes, Op } from 'sequelize';
import AbstractModel from './AbstractModel.js';
import TemplateModel from './TemplateModel.js';

export default class TemplateVersionModel extends AbstractModel {
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
                content: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                template_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: TemplateModel.init(),
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
                modelName: 'TemplateVersion',
                tableName: 'TemplatesVersions',
                underscored: true,
                hooks: {
                    afterCreate: (templateVersion, options) => {
                        this.update(
                            {
                                status: false
                            }, 
                            {
                                where: {
                                    id: {
                                        [Op.not]: templateVersion.id
                                    },
                                    template_id: templateVersion.template_id,
                                    status: true
                                }
                            }
                        )
                    }
                }
            }
        };
        if (connection)
            params.connection = connection;

        const model = super.init(params);

        return model;
    }
}