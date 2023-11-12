import FindAllTemplateTypesUseCase from "../../useCase/templateType/FindAllTemplateTypesUseCase.js";

export default class FindAllTemplateTypesUseCaseFactory {
    constructor ({
        templateTypeService = null,
        templateTypeRepository = null,
    } = {}) {
        this.templateTypeService = templateTypeService;
        this.templateTypeRepository = templateTypeRepository;
    }

    build() {
        return new FindAllTemplateTypesUseCase({
            templateTypeService: new this.templateTypeService({
                templateTypeRepository: new this.templateTypeRepository()
            }),
        })
    }
}