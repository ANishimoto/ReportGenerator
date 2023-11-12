import DeleteTemplateUseCase from "../../useCase/template/DeleteTemplateUseCase.js";

export default class DeleteTemplateUseCaseFactory {
    constructor ({
        templateService = null,
        templateRepository = null,
    } = {}) {
        this.templateService = templateService;
        this.templateRepository = templateRepository;
    }

    build() {
        return new DeleteTemplateUseCase({
            templateService: new this.templateService({
                templateRepository: new this.templateRepository()
            }),
        })
    }
}