import DeleteTemplateTypeUseCase from "../../useCase/templateType/DeleteTemplateTypeUseCase.js";

export default class DeleteTemplateTypeUseCaseFactory {
    constructor ({
        templateTypeService = null,
        templateTypeRepository = null,
    } = {}) {
        this.templateTypeService = templateTypeService;
        this.templateTypeRepository = templateTypeRepository;
    }

    build() {
        return new DeleteTemplateTypeUseCase({
            templateTypeService: new this.templateTypeService({
                templateTypeRepository: new this.templateTypeRepository()
            }),
        })
    }
}