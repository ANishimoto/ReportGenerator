import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import FindOneTemplateTypeStrategy from "../../strategy/templateType/FindOneTemplateTypeStrategy.js";

export default class FindOneTemplateTypeUseCase extends AbstractUseCase {
    constructor ({
        templateTypeService = null
    } = {}) {
        super();
        this.templateTypeService = templateTypeService;
        this.strategies = [
            new FindOneTemplateTypeStrategy({
                templateTypeService: this.templateTypeService
            }),
        ];
    }

    async findOneTemplateType(filter) {
        return await this.executeStrategies(filter, new Result());
    }
}