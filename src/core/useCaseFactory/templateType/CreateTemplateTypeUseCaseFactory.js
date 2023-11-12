import CreateTemplateTypeUseCase from "../../useCase/templateType/CreateTemplateTypeUseCase.js";

export default class CreateTemplateTypeUseCaseFactory {
    constructor ({
        templateTypeService = null,
        templateTypeRepository = null,
    } = {}) {
        this.templateTypeService = templateTypeService;
        this.templateTypeRepository = templateTypeRepository;
    }

    build() {
        return new CreateTemplateTypeUseCase({
            templateTypeService: new this.templateTypeService({
                templateTypeRepository: new this.templateTypeRepository()
            }),
        })
    }
}