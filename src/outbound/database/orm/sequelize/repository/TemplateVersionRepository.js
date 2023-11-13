import AbstractTemplateVersionRepository from "../../../../../core/repository/AbstractTemplateVersionRepository.js";
import TemplateVersionModel from "../model/TemplateVersionModel.js";

export default class TemplateVersionRepository extends AbstractTemplateVersionRepository {
    constructor () {
        super();
    }

    async save(template) {
        await this.createConnection(TemplateVersionModel);
        return await this.connection.create(
            {
                content: template.templateVersions[0].content,
                status: template.templateVersions[0].status,
                template_id: template.id,
            }
        );
    }

    async update(template, filter) {
        await this.createConnection(TemplateVersionModel);
        throw new Error(`Method update of ${this.constructor.name} should not be used!`);
    }

    async delete(filter) {
        await this.createConnection(TemplateVersionModel);
        throw new Error(`Method delete of ${this.constructor.name} should not be used!`);      
    }

    async findAll(filter) {
        await this.createConnection(TemplateVersionModel);
        return await this.connection.findAndCountAll(filter);
    }

    async findOne(filter) {
        await this.createConnection(TemplateVersionModel);
        return await this.connection.findOne(filter);
    }
}