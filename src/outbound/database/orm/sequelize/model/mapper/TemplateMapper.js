import Template from "../../../../../../core/domain/Template.js";
import TemplateModel from "../TemplateModel.js";
import AbstractMapper from "./AbstractMapper.js";


export default class TemplateMapper extends AbstractMapper {
    constructor() {
        super();
    }

    adapt(object) {
        if (object instanceof TemplateModel)
            return this.adaptModelToEntity(object);
        
        return object;
    }

    adaptModelToEntity(model) {
        const entity = new Template();
        
        entity.id = model.id;
        entity.title = model.title;
        entity.status = model.status;
        entity.createdAt = model.createdAt;
        entity.updatedAt = model.updatedAt;

        return entity;
    }
}