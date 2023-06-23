import User from '../../../../core/domain/User.js';
import UserModel from '../UserModel.js';
import AbstractMapper from './AbstractMapper.js';

export default class UserMapper extends AbstractMapper {
    constructor() {
        super();
    }

    adapt(object) {
        switch (object.constructor.name) {
            case `${User.constructor.name}`:
                return this.adaptEntityToModel(object);
            case `${UserModel.constructor.name}`:
                return this.adaptModelToEntity(object);
            default:
                return object;
        }
    }

    adaptEntityToModel(entity) {
        const model = new UserModel();
        const keys = Object.keys(entity);
        for (const key of keys) {
            model[key] = entity[key];
        }
    }

    adaptModelToEntity(model) {
        const entity = new User();
        const keys = Object.keys(model);
        for (const key of keys) {
            entity[key] = model[key];
        }
    }
}