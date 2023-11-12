import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateFileConfigFieldsStrategy from "../../strategy/generateCsvFile/ValidateFileConfigFieldsStrategy.js";
import CreateCsvFileStrategy from "../../strategy/generateCsvFile/CreateCsvFileStrategy.js";
import CreateEjsFileStrategy from "../../strategy/generateCsvFile/CreateEjsFileStrategy.js";
import GetCsvFileStreamStrategy from "../../strategy/generateCsvFile/GetCsvFileStreamStrategy.js";

export default class GenerateCsvFileUseCase extends AbstractUseCase {
    constructor ({
        templateService = null,
        fileService = null
    } = {}) {
        super();
        this.templateService = templateService;
        this.fileService = fileService;
        this.strategies = [
            new ValidateFileConfigFieldsStrategy({
                templateService: this.templateService
            }),
            new CreateEjsFileStrategy({
                fileService: this.fileService
            }),
            new CreateCsvFileStrategy({
                fileService: this.fileService
            }),
            new GetCsvFileStreamStrategy(),
        ];
    }

    async execute({fileGenerateConfig}) {
        return await this.executeStrategies({fileGenerateConfig}, new Result());
    }
}