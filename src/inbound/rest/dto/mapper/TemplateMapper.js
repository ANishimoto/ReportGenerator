import AbstractMapper from './AbstractMapper.js';
import Template from '../../../../core/domain/Template.js';
import TemplateType from '../../../../core/domain/TemplateType.js';
import TemplateVersion from '../../../../core/domain/TemplateVersion.js';
import TemplateDTOForList from '../response/TemplateDTOForList.js';
import TemplateTypeMapper from './TemplateTypeMapper.js';
import TemplateDTOForRead from '../response/TemplateDTOForRead.js';
import TemplateVersionMapper from './TemplateVersionMapper.js';

export default class TemplateMapper extends AbstractMapper {
    constructor() {
        super();
        this.templateTypeMapper = new TemplateTypeMapper();
        this.templateVersionMapper = new TemplateVersionMapper();
    }

    adaptRequestDTOToEntity(dto) {
        const template = new Template();
        
        template.id = dto.id;
        template.title = dto.title;
        template.status = dto.status;
        template.templateType = new TemplateType(dto.type);
        template.templateVersions.push(
            new TemplateVersion({
                content: dto.content,
                status: dto.status
            })
        );

        return template;
    }

    adaptEntityToResponseDTOForList(entity) {
        const dto = new TemplateDTOForList();
        
        dto.id = entity.id;
        dto.title = entity.title;
        dto.status = entity.status;
        dto.type = this.templateTypeMapper.adaptEntityToResponseDTOForList(entity.templateType);

        return dto;
    }

    adaptEntityToResponseDTOForRead(entity) {
        const dto = new TemplateDTOForRead();
        
        dto.id = entity.id;
        dto.title = entity.title;
        dto.status = entity.status;
        dto.type = this.templateTypeMapper.adaptEntityToResponseDTOForList(entity.templateType);
        dto.currentVersion = this.templateVersionMapper.adaptEntityToResponseDTOForList(entity.templateVersions.find(version => {
            return version.status = true;
        }));

        return dto;
    }
}