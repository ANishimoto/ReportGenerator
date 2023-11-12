import FindOneTemplateTypeUseCase from "../../useCase/templateType/FindOneTemplateTypeUseCase.js";

export default class FindOneTemplateTypeUseCaseFactory {
    constructor ({
        templateTypeService = null,
        templateTypeRepository = null,
    } = {}) {
        this.templateTypeService = templateTypeService;
        this.templateTypeRepository = templateTypeRepository;
    }

    build() {
        return new FindOneTemplateTypeUseCase({
            templateTypeService: new this.templateTypeService({
                templateTypeRepository: new this.templateTypeRepository()
            }),
        })
    }
}