import FileGenerateConfig from '../../domain/FileGenerateConfig.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';
import fs from 'fs';

export default class GetCsvFileStreamStrategy extends AbstractStrategy {
    constructor ({
        result = new Result()
    } = {}) {
        super();
        this.result = result;
    }

    async execute({fileGenerateConfig = FileGenerateConfig()}, result = this.result) {
        try {
            result.data = {
                entity: fileGenerateConfig,
                stream: fs.createReadStream(`${fileGenerateConfig.path}/${fileGenerateConfig.outputFileName}${fileGenerateConfig.outputFileExtension}`)
            }
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