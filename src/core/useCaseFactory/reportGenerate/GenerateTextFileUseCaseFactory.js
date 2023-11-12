import GenerateTextFileUseCase from "../../useCase/reportGenerate/GenerateTextFileUseCase.js";

export default class GenerateTextFileUseCaseFactory {
    constructor ({
        templateService = null,
        fileService = null,
    } = {}) {
        this.templateService = templateService;
        this.fileService = fileService;
    }

    build() {
        return new GenerateTextFileUseCase({
            templateService: new this.templateService(),
            fileService: new this.fileService(),
        })
    }
}