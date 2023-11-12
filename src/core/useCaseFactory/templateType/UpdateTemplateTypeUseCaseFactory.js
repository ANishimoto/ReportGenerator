import UpdateTemplateTypeUseCase from "../../useCase/templateType/UpdateTemplateTypeUseCase.js";

export default class UpdateTemplateTypeUseCaseFactory {
    constructor ({
        templateTypeService = null,
        templateTypeRepository = null,
    } = {}) {
        this.templateTypeService = templateTypeService;
        this.templateTypeRepository = templateTypeRepository;
    }

    build() {
        return new UpdateTemplateTypeUseCase({
            templateTypeService: new this.templateTypeService({
                templateTypeRepository: new this.templateTypeRepository()
            }),
        })
    }
}