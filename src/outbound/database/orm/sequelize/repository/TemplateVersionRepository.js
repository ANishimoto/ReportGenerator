import ITemplateVersionRepository from "../../../../../core/repository/ITemplateVersionRepository.js";
import TemplateVersionModel from "../model/TemplateVersionModel.js";

export default class TemplateVersionRepository extends ITemplateVersionRepository {
    constructor () {
        super(TemplateVersionModel.init());
    }

    async save(template) {
        return await this.connection.create(
            {
                content: template.templateVersions[0].content,
                status: template.templateVersions[0].status,
                template_id: template.id,
            }
        );
    }

    async update(template, filter) {
        throw new Error(`Method update of ${this.constructor.name} should not be used!`);
    }

    async delete(filter) {
        throw new Error(`Method delete of ${this.constructor.name} should not be used!`);      
    }

    async findAll(filter) {
        return await this.connection.findAndCountAll(filter);
    }

    async findOne(filter) {
        return await this.connection.findOne(filter);
    }
}