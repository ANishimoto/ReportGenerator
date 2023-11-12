import UpdateTemplateUseCase from "../../useCase/template/UpdateTemplateUseCase.js";

export default class UpdateTemplateUseCaseFactory {
    constructor ({
        templateService = null,
        templateRepository = null,
    } = {}) {
        this.templateService = templateService;
        this.templateRepository = templateRepository;
    }

    build() {
        return new UpdateTemplateUseCase({
            templateService: new this.templateService({
                templateRepository: new this.templateRepository()
            }),
        })
    }
}