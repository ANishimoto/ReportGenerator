import FileGenerateConfig from '../../domain/FileGenerateConfig.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';

export default class CreatePdfFileStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        puppeteerService = null
    } = {}) {
        super();
        this.result = result;
        this.puppeteerService = puppeteerService;
    }

    async execute({fileGenerateConfig = FileGenerateConfig()}, result = this.result) {
        try {
            fileGenerateConfig = await this.puppeteerService.createFile(fileGenerateConfig);
            fileGenerateConfig.outputFileExtension = '.pdf';
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