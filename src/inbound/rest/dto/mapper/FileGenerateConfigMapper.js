import FileGenerateConfig from '../../../../core/domain/FileGenerateConfig.js';
import AbstractMapper from './AbstractMapper.js';

export default class FileGenerateConfigMapper extends AbstractMapper {
    constructor() {
        super();
    }

    adaptRequestDTOToEntity(dto) {
        const fileGenerateConfig = new FileGenerateConfig();
        
        fileGenerateConfig.template.id = dto.template;
        fileGenerateConfig.originalName = dto.originalName;
        fileGenerateConfig.fileName = dto.fileName;
        fileGenerateConfig.path = dto.path;

        return fileGenerateConfig;
    }
}