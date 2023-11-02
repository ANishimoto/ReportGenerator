import TemplateType from "../../../../../../core/domain/TemplateType.js";
import TemplateTypeModel from "../TemplateTypeModel.js";
import AbstractMapper from "./AbstractMapper.js";


export default class TemplateTypeMapper extends AbstractMapper {
    constructor() {
        super();
    }

    adapt(object) {
        if (object instanceof TemplateTypeModel)
            return this.adaptModelToEntity(object);
        
        return object;
    }

    adaptModelToEntity(model) {
        const entity = new TemplateType();
        
        entity.id = model.id;
        entity.name = model.name;
        entity.status = model.status;
        entity.createdAt = model.createdAt;
        entity.updatedAt = model.updatedAt;
        
        return entity;
    }
}