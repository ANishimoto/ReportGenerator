import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateFileConfigFieldsStrategy from "../../strategy/generatePdfFile/ValidateFileConfigFieldsStrategy.js";
import CreateEjsFileStrategy from "../../strategy/generatePdfFile/CreateEjsFileStrategy.js";
import CreateHtmlFileStrategy from "../../strategy/generatePdfFile/CreateHtmlFileStrategy.js";
import CreatePdfFileStrategy from "../../strategy/generatePdfFile/CreatePdfFileStrategy.js";
import GetPdfFileStreamStrategy from "../../strategy/generatePdfFile/GetPdfFileStreamStrategy.js";

export default class GeneratePdfFileUseCase extends AbstractUseCase {
    constructor ({
        templateService = null,
        fileService = null,
        puppeteerService = null
    } = {}) {
        super();
        this.templateService = templateService;
        this.fileService = fileService;
        this.puppeteerService = puppeteerService;
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
            new CreatePdfFileStrategy({
                puppeteerService: this.puppeteerService
            }),
            new GetPdfFileStreamStrategy(),
        ];
    }

    async execute({fileGenerateConfig}) {
        return await this.executeStrategies({fileGenerateConfig}, new Result());
    }
}