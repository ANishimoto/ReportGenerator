import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateFileConfigFieldsStrategy from "../../strategy/generateTextFile/ValidateFileConfigFieldsStrategy.js";
import CreateTextFileStrategy from "../../strategy/generateTextFile/CreateTextFileStrategy.js";
import CreateEjsFileStrategy from "../../strategy/generateTextFile/CreateEjsFileStrategy.js";
import GetTextFileStreamStrategy from "../../strategy/generateTextFile/GetTextFileStreamStrategy.js";

export default class GenerateTextFileUseCase extends AbstractUseCase {
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
            new CreateTextFileStrategy({
                fileService: this.fileService
            }),
            new GetTextFileStreamStrategy(),
        ];
    }

    async execute({fileGenerateConfig}) {
        return await this.executeStrategies({fileGenerateConfig}, new Result());
    }
}