import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateFileConfigFieldsStrategy from "../../strategy/generateHtmlFile/ValidateFileConfigFieldsStrategy.js";
import CreateEjsFileStrategy from "../../strategy/generateHtmlFile/CreateEjsFileStrategy.js";
import CreateHtmlFileStrategy from "../../strategy/generateHtmlFile/CreateHtmlFileStrategy.js";
import GetHtmlFileStreamStrategy from "../../strategy/generateHtmlFile/GetHtmlFileStreamStrategy.js";

export default class GenerateHtmlFileUseCase extends AbstractUseCase {
    constructor ({
        templateService = null,
        fileService = null,
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
            new CreateHtmlFileStrategy({
                fileService: this.fileService
            }),
            new GetHtmlFileStreamStrategy(),
        ];
    }

    async execute({fileGenerateConfig}) {
        return await this.executeStrategies({fileGenerateConfig}, new Result());
    }
}