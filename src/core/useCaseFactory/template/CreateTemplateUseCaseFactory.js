import CreateTemplateUseCase from "../../useCase/template/CreateTemplateUseCase.js";

export default class CreateTemplateUseCaseFactory {
    constructor ({
        templateService = null,
        templateRepository = null,
    } = {}) {
        this.templateService = templateService;
        this.templateRepository = templateRepository;
    }

    build() {
        return new CreateTemplateUseCase({
            templateService: new this.templateService({
                templateRepository: new this.templateRepository()
            }),
        })
    }
}