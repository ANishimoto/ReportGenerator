import GeneratePdfFileUseCase from "../../useCase/reportGenerate/GeneratePdfFileUseCase.js";

export default class GeneratePdfFileUseCaseFactory {
    constructor ({
        templateService = null,
        fileService = null,
        puppeteerService = null
    } = {}) {
        this.templateService = templateService;
        this.fileService = fileService;
        this.puppeteerService = puppeteerService;
    }

    build() {
        return new GeneratePdfFileUseCase({
            templateService: new this.templateService(),
            fileService: new this.fileService(),
            puppeteerService: new this.puppeteerService(),
        })
    }
}