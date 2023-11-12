import GenerateCsvFileUseCase from "../../useCase/reportGenerate/GenerateCsvFileUseCase.js";

export default class GenerateCsvFileUseCaseFactory {
    constructor ({
        templateService = null,
        fileService = null,
    } = {}) {
        this.templateService = templateService;
        this.fileService = fileService;
    }

    build() {
        return new GenerateCsvFileUseCase({
            templateService: new this.templateService(),
            fileService: new this.fileService(),
        })
    }
}