import FindAllTemplatesUseCase from "../../useCase/template/FindAllTemplatesUseCase.js";

export default class FindAllTemplatesUseCaseFactory {
    constructor ({
        templateService = null,
        templateRepository = null,
    } = {}) {
        this.templateService = templateService;
        this.templateRepository = templateRepository;
    }

    build() {
        return new FindAllTemplatesUseCase({
            templateService: new this.templateService({
                templateRepository: new this.templateRepository()
            }),
        })
    }
}