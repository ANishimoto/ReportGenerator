import GenerateHtmlFileUseCase from "../../useCase/reportGenerate/GenerateHtmlFileUseCase.js";

export default class GenerateHtmlFileUseCaseFactory {
    constructor ({
        templateService = null,
        fileService = null,
    } = {}) {
        this.templateService = templateService;
        this.fileService = fileService;
    }

    build() {
        return new GenerateHtmlFileUseCase({
            templateService: new this.templateService(),
            fileService: new this.fileService(),
        })
    }
}