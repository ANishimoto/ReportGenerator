import FileGenerateConfig from '../../domain/FileGenerateConfig.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';

export default class CreateTextFileStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        fileService = null
    } = {}) {
        super();
        this.result = result;
        this.fileService = fileService;
    }

    async execute({fileGenerateConfig = FileGenerateConfig()}, result = this.result) {
        try {
            const data = {
                data: {}
            };
            fileGenerateConfig = await this.fileService.createTXTFile(fileGenerateConfig, data);
            fileGenerateConfig.outputFileExtension = '.txt';
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