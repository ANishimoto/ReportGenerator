import AbstractMapper from './AbstractMapper.js';
import TemplateVersionDTOForList from '../response/TemplateVersionDTOForList.js';

export default class TemplateVersionMapper extends AbstractMapper {
    constructor() {
        super();
    }

    adaptEntityToResponseDTOForList(entity) {
        const dto = new TemplateVersionDTOForList();
        
        dto.id = entity.id;
        dto.content = entity.content;
        dto.status = entity.status;

        return dto;
    }
}