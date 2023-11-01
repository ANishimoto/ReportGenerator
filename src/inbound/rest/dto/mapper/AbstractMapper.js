import AbstractEntity from "../../../../core/domain/AbstractEntity.js";
import AbstractDTO from "../AbstractDTO.js";

export default class AbstractMapper {
    constructor() {}

    adapt(object) {
        switch (object.constructor.name) {
            case `${AbstractEntity.constructor.name}`:
                return this.adaptEntityToDTO(object);
            case `${AbstractDTO.constructor.name}`:
                return this.adaptDTOToEntity(object);
            default:
                return object;
        }
    }

    adaptEntityToDTO(entity) {
        const dto = new AbstractDTO();
        const keys = Object.keys(entity);
        for (const key of keys) {
            dto[key] = entity[key];
        }
    }

    adaptDTOToEntity(dto) {
        const entity = new AbstractEntity();
        const keys = Object.keys(dto);
        for (const key of keys) {
            entity[key] = dto[key];
        }
    }
}