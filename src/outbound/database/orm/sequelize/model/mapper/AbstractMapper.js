import AbstractEntity from '../../../../../../core/domain/AbstractEntity.js';
import AbstractModel from '../AbstractModel.js';

export default class AbstractMapper {
    constructor() {}

    adapt(object) {
        switch (object.constructor.name) {
            case `${AbstractEntity.constructor.name}`:
                return this.adaptEntityToModel(object);
            case `${AbstractModel.constructor.name}`:
                return this.adaptModelToEntity(object);
            default:
                return object;
        }
    }

    adaptEntityToModel(entity) {
        const model = new AbstractModel();
        const keys = Object.keys(entity);
        for (const key of keys) {
            model[key] = entity[key];
        }
    }

    adaptModelToEntity(model) {
        const entity = new AbstractEntity();
        const keys = Object.keys(model);
        for (const key of keys) {
            entity[key] = model[key];
        }
    }
}