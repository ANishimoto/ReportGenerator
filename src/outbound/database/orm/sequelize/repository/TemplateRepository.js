import ITemplateRepository from "../../../../../core/repository/ITemplateRepository.js";
import { INATIVO } from "../../../../../core/enum/StatusEnum.js";
import TemplateModel from "../model/TemplateModel.js";

export default class TemplateRepository extends ITemplateRepository {
    constructor () {
        super();
    }

    async save(template) {
        this.createConnection(TemplateModel);
        return await this.connection.create(
            {
                title: template.title,
                status: template.status,
                templateTypeId: template.templateType.id,
            }
        );
    }

    async update(template, filter) {
        this.createConnection(TemplateModel);
        const count = await this.connection.update(
            {
                title: template.title,
                status: template.status,
            },
            filter
        );
        template = await this.connection.findOne(
            filter
        );
        return {
            count: count[0],
            template
        };
    }

    async delete(filter) {
        this.createConnection(TemplateModel);
        return await this.connection.update(
            {
                status: INATIVO
            },
            filter
        )        
    }

    async findAll(filter) {
        this.createConnection(TemplateModel);
        return await this.connection.findAndCountAll(filter);
    }

    async findOne(filter) {
        this.createConnection(TemplateModel);
        return await this.connection.findOne(filter);
    }
}