import ITemplateTypeRepository from "../../../../../core/repository/ITemplateTypeRepository.js";
import { INATIVO } from "../../../../../core/enum/StatusEnum.js";
import TemplateTypeModel from "../model/TemplateTypeModel.js";

export default class TemplateTypeRepository extends ITemplateTypeRepository {
    constructor () {
        super(TemplateTypeModel.init());
    }

    async save(templateType) {
        return await this.connection.create(
            {
                name: templateType.name,
                password: templateType.password,
                status: templateType.status,
            }
        );
    }

    async update(templateType, filter) {
        const count = await this.connection.update(
            {
                name: templateType.name,
                password: templateType.password,
                status: templateType.status,
            },
            filter
        );
        templateType = await this.connection.findOne(
            filter
        );
        return {
            count: count[0],
            templateType
        };
    }

    async delete(filter) {
        return await this.connection.update(
            {
                status: INATIVO
            },
            filter
        )        
    }

    async findAll(filter) {
        return await this.connection.findAndCountAll(filter);
    }

    async findOne(filter) {
        return await this.connection.findOne(filter);
    }
}