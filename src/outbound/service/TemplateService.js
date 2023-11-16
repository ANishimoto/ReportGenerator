import ITemplateService from '../../core/service/ITemplateService.js';

//Domain Mapper
import TemplateMapper from '../database/orm/sequelize/model/mapper/TemplateMapper.js';
import TemplateVersionMapper from '../database/orm/sequelize/model/mapper/TemplateVersionMapper.js';
import TemplateTypeMapper from '../database/orm/sequelize/model/mapper/TemplateTypeMapper.js';

//Filter Mapper
import TemplateFilterMapper from '../database/orm/sequelize/filter/mapper/TemplateFilterMapper.js';
import TemplateVersionFilterMapper from '../database/orm/sequelize/filter/mapper/TemplateVersionFilterMapper.js';

//Filter
import TemplateTypeFilter from '../database/orm/sequelize/filter/TemplateTypeFilter.js';
import TemplateVersionFilter from '../database/orm/sequelize/filter/TemplateVersionFilter.js';

//Repository
import TemplateRepository from '../database/orm/sequelize/repository/TemplateRepository.js';
import TemplateVersionRepository from '../database/orm/sequelize/repository/TemplateVersionRepository.js';
import TemplateTypeRepository from '../database/orm/sequelize/repository/TemplateTypeRepository.js';
import { ATIVO } from '../../core/enum/StatusEnum.js';

export default class TemplateService extends ITemplateService {
    constructor({
        templateRepository = new TemplateRepository(),
        templateVersionRepository = new TemplateVersionRepository(),
        templateTypeRepository = new TemplateTypeRepository()
    } = {}) {
        super();
        this.createTemplate = this.createTemplate.bind(this);
        this.findAllTemplates = this.findAllTemplates.bind(this);
        this.findOneTemplate = this.findOneTemplate.bind(this);
        this.deleteTemplate = this.deleteTemplate.bind(this);
        this.updateTemplate = this.updateTemplate.bind(this);
        this.templateRepository = templateRepository;
        this.templateVersionRepository = templateVersionRepository;
        this.templateTypeRepository = templateTypeRepository;
        this.templateMapper =  new TemplateMapper();
        this.templateTypeMapper =  new TemplateTypeMapper();
        this.templateVersionMapper =  new TemplateVersionMapper();
        this.templateFilterMapper = new TemplateFilterMapper();
        this.templateVersionFilterMapper = new TemplateVersionFilterMapper();
    }

    async createTemplate(template) {
        const templateModel = await this.templateRepository.save(template);
        template.id = templateModel.id;
        const templateVersionModel = await this.templateVersionRepository.save(template);

        const templateTypeFilter = new TemplateTypeFilter();
        templateTypeFilter.concat({id: templateModel.templateTypeId})
        const templateTypeModel = await this.templateTypeRepository.findOne(templateTypeFilter.mountFilter());

        template = this.templateMapper.adapt(templateModel);
        template.templateVersions = [this.templateVersionMapper.adapt(templateVersionModel)];
        template.templateType = this.templateTypeMapper.adapt(templateTypeModel);

        return template;
    }

    async findAllTemplates(filter) {
        const templateFilter = this.templateFilterMapper.adapt(filter);
        filter = templateFilter.mountFilter();
console.log(filter);
        const templateModels = await this.templateRepository.findAll(filter);
        
        const templates = [];
        for (const templateModel of templateModels.rows) {
            const templateTypeFilter = new TemplateTypeFilter();
            templateTypeFilter.concat({id: templateModel.templateTypeId})
            const templateTypeModel = await this.templateTypeRepository.findOne(templateTypeFilter.mountFilter());
            
            const templateVersionFilter = new TemplateVersionFilter();
            templateVersionFilter.concat({
                template_id: templateModel.id,
                status: ATIVO
            });
            const templateVersionModel = await this.templateVersionRepository.findOne(templateVersionFilter.mountFilter());
            
            const template = this.templateMapper.adapt(templateModel);

            template.templateType = this.templateTypeMapper.adapt(templateTypeModel);
            template.templateVersions.push(this.templateVersionMapper.adapt(templateVersionModel));

            templates.push(template);
        }
        return {
            templates,
            count: templateModels.count
        };
    }

    async findOneTemplate(filter) {
        const templateFilter = this.templateFilterMapper.adapt(filter);
        filter = templateFilter.mountFilter();

        const templateModel = await this.templateRepository.findOne(filter);
        
        if (!templateModel) return null;
        
        const templateTypeFilter = new TemplateTypeFilter();
        templateTypeFilter.concat({id: templateModel.templateTypeId})
        const templateTypeModel = await this.templateTypeRepository.findOne(templateTypeFilter.mountFilter());
        const template = this.templateMapper.adapt(templateModel);

        const templateVersionFilter = new TemplateVersionFilter();
        templateVersionFilter.concat({
            template_id: templateModel.id,
            status: ATIVO
        });
        const templateVersionModel = await this.templateVersionRepository.findOne(templateVersionFilter.mountFilter());
        
        template.templateType = this.templateTypeMapper.adapt(templateTypeModel);
        template.templateVersions.push(this.templateVersionMapper.adapt(templateVersionModel));
        
        return {
            template,
            count: 1
        };
    }

    async deleteTemplate(filter) {
        const templateFilter = this.templateFilterMapper.adapt(filter);
        filter = templateFilter.mountFilter();

        await this.templateRepository.delete(filter);
        
        return;
    }

    async updateTemplate(template, filter) {
        const templateFilter = this.templateFilterMapper.adapt(filter);
        filter = templateFilter.mountFilter();

        const response = await this.templateRepository.update(template, filter);
        const templateVersionModel = await this.templateVersionRepository.save(template);

        const templateTypeFilter = new TemplateTypeFilter();
        templateTypeFilter.concat({id: response.template.templateTypeId})
        const templateTypeModel = await this.templateTypeRepository.findOne(templateTypeFilter.mountFilter());

        template = (response.template) ? this.templateMapper.adapt(response.template): null;
        template.templateVersions = [this.templateVersionMapper.adapt(templateVersionModel)];
        template.templateType = this.templateTypeMapper.adapt(templateTypeModel);

        return {
            template,
            count: response.count
        };
    }
}