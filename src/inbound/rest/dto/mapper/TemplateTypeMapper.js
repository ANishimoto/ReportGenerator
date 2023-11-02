import AbstractMapper from './AbstractMapper.js';
import TemplateType from '../../../../core/domain/TemplateType.js';
import TemplateTypeDTOForList from '../response/TemplateTypeDTOForList.js';

export default class TemplateTypeMapper extends AbstractMapper {
    constructor() {
        super();
    }

    adaptRequestDTOToEntity(dto) {
        const templateType = new TemplateType();
        
        templateType.id = dto.id;
        templateType.name = dto.name;
        templateType.status = dto.status;

        return templateType;
    }

    adaptEntityToResponseDTOForList(entity) {
        const dto = new TemplateTypeDTOForList();
        
        dto.id = entity.id;
        dto.name = entity.name;
        dto.status = entity.status;

        return dto;
    }
}