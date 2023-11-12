import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import DeleteTemplateTypeStrategy from "../../strategy/templateType/DeleteTemplateTypeStrategy.js";

export default class DeleteTemplateTypeUseCase extends AbstractUseCase {
    constructor ({
        templateTypeService = null
    } = {}) {
        super();
        this.templateTypeService = templateTypeService;
        this.strategies = [
            new DeleteTemplateTypeStrategy({
                templateTypeService: this.templateTypeService
            }),
        ];
    }

    async execute(filter) {
        return await this.executeStrategies(filter, new Result());
    }
}