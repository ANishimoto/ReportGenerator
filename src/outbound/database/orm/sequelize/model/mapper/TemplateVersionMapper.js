import TemplateVersion from "../../../../../../core/domain/TemplateVersion.js";
import TemplateVersionModel from "../TemplateVersionModel.js";
import AbstractMapper from "./AbstractMapper.js";


export default class TemplateVersionMapper extends AbstractMapper {
    constructor() {
        super();
    }

    adapt(object) {
        if (object instanceof TemplateVersionModel)
            return this.adaptModelToEntity(object);
        
        return object;
    }

    adaptModelToEntity(model) {
        const entity = new TemplateVersion();
        
        entity.id = model.id;
        entity.content = model.content;
        entity.status = model.status;
        entity.createdAt = model.createdAt;
        entity.updatedAt = model.updatedAt;

        return entity;
    }
}