import FileGenerateConfig from '../../domain/FileGenerateConfig.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';

export default class CreateEjsFileStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        fileService = null,
    } = {}) {
        super();
        this.result = result;
        this.fileService = fileService;
    }

    async execute({fileGenerateConfig = FileGenerateConfig()}, result = this.result) {
        fileGenerateConfig.outputFileName = `${fileGenerateConfig.template.title}`;
        fileGenerateConfig.outputFileExtension = '.ejs';

        try {
            fileGenerateConfig = await this.fileService.createEjsFile(fileGenerateConfig);
            result.status = 201;
        } catch (error) {
            console.log(error);
            result.status = 500;
        }
        return {
            entity: {fileGenerateConfig},
            result
        }
    }
}