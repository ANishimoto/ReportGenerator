import FileGenerateConfig from '../../domain/FileGenerateConfig.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';

export default class CreateHtmlFileStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        fileService = null,
    } = {}) {
        super();
        this.result = result;
        this.fileService = fileService;
    }

    async execute({fileGenerateConfig = FileGenerateConfig()}, result = this.result) {
        const ejsFilePath = `${fileGenerateConfig.path}/${fileGenerateConfig.outputFileName}${fileGenerateConfig.outputFileExtension}`

        try {
            const data = {
                filePath: `../../${ejsFilePath}`,
                data: {}
            };
            fileGenerateConfig = await this.fileService.createHTMLFile(fileGenerateConfig, data);
            fileGenerateConfig.outputFileExtension = '.html';
            result.status = 201;
            
        } catch (error) {
            console.log(error);
            result.status = 500;
        }
        return {
            entity: {fileGenerateConfig},
            result
        };
    }
}