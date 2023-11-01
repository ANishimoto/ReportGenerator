import AbstractEntity from '../../../../../../core/domain/AbstractEntity.js';
import AbstractModel from '../AbstractModel.js';

export default class AbstractMapper {
    constructor() {}

    adapt(object) {
        if (object instanceof Abstract)
            return this.adaptEntityToModel(object);
        
        if (object instanceof AbstractModel)
            return this.adaptModelToEntity(object);
        
        return object;
    }

    adaptEntityToModel(entity) {
        const model = new AbstractModel();
        const keys = Object.keys(entity);
        for (const key of keys) {
            model[key] = entity[key];
        }
        return model;
    }

    adaptModelToEntity(model) {
        const entity = new AbstractEntity();
        const keys = Object.keys(model);
        for (const key of keys) {
            entity[key] = model[key];
        }
        return entity;
    }
}