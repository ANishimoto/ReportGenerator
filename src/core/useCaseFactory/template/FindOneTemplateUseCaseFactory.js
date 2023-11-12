import FindOneTemplateUseCase from "../../useCase/template/FindOneTemplateUseCase.js";

export default class FindOneTemplateUseCaseFactory {
    constructor ({
        templateService = null,
        templateRepository = null,
    } = {}) {
        this.templateService = templateService;
        this.templateRepository = templateRepository;
    }

    build() {
        return new FindOneTemplateUseCase({
            templateService: new this.templateService({
                templateRepository: new this.templateRepository()
            }),
        })
    }
}