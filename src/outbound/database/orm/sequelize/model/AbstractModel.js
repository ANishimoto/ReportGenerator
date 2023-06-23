import { Sequelize, Model } from 'sequelize';
import { defaultConnection } from '../connection/index.js';

export default class AbstractModel extends Model {
    static init({
        attributes = null,
        options = null,
        connection = new Sequelize(defaultConnection),
    } = {}) {
        super.init(
            attributes,
            {
                modelName: options.modelName,
                tableName: options.tableName,
                underscored: options.underscored,
                sequelize: connection
            }
        );
        return connection.models[options.modelName];
    }
}