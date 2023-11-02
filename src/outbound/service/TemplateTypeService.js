import ITemplateTypeService from '../../core/service/ITemplateTypeService.js';
import TemplateTypeFilterMapper from '../database/orm/sequelize/filter/mapper/TemplateTypeFilterMapper.js';
import TemplateTypeMapper from '../database/orm/sequelize/model/mapper/TemplateTypeMapper.js';
import TemplateTypeRepository from '../database/orm/sequelize/repository/TemplateTypeRepository.js';

export default class TemplateTypeService extends ITemplateTypeService {
    constructor({
        templateTypeRepository = new TemplateTypeRepository(),
    } = {}) {
        super();
        this.createTemplateType = this.createTemplateType.bind(this);
        this.findAllTemplateTypes = this.findAllTemplateTypes.bind(this);
        this.findOneTemplateType = this.findOneTemplateType.bind(this);
        this.deleteTemplateType = this.deleteTemplateType.bind(this);
        this.updateTemplateType = this.updateTemplateType.bind(this);
        this.templateTypeRepository = templateTypeRepository;
        this.templateTypeMapper =  new TemplateTypeMapper();
        this.templateTypeFilterMapper = new TemplateTypeFilterMapper();
    }

    async createTemplateType(templateType) {
        const templateTypeModel = await this.templateTypeRepository.save(templateType);
        templateType = this.templateTypeMapper.adapt(templateTypeModel);

        return templateType;
    }

    async findAllTemplateTypes(filter) {
        const templateTypeFilter = this.templateTypeFilterMapper.adapt(filter);
        filter = templateTypeFilter.mountFilter();

        const templateTypeModels = await this.templateTypeRepository.findAll(filter);

        const templateTypes = [];
        for (const templateTypeModel of templateTypeModels.rows) {
            templateTypes.push(this.templateTypeMapper.adapt(templateTypeModel));
        }
        return {
            templateTypes,
            count: templateTypeModels.count
        };
    }

    async findOneTemplateType(filter) {
        const templateTypeFilter = this.templateTypeFilterMapper.adapt(filter);
        filter = templateTypeFilter.mountFilter();

        const templateTypeModel = await this.templateTypeRepository.findOne(filter);
        
        if (!templateTypeModel) return null;

        return {
            templateType: this.templateTypeMapper.adapt(templateTypeModel),
            count: 1
        };
    }

    async deleteTemplateType(filter) {
        const templateTypeFilter = this.templateTypeFilterMapper.adapt(filter);
        filter = templateTypeFilter.mountFilter();

        await this.templateTypeRepository.delete(filter);
        
        return;
    }

    async updateTemplateType(templateType, filter) {
        const templateTypeFilter = this.templateTypeFilterMapper.adapt(filter);
        filter = templateTypeFilter.mountFilter();

        const response = await this.templateTypeRepository.update(templateType, filter);

        templateType = (response.templateType) ? this.templateTypeMapper.adapt(response.templateType): null;

        return {
            templateType,
            count: response.count
        };
    }
}