import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import FindAllTemplateTypesStrategy from "../../strategy/templateType/FindAllTemplateTypesStrategy.js";

export default class FindAllTemplateTypesUseCase extends AbstractUseCase {
    constructor ({
        templateTypeService = null
    } = {}) {
        super();
        this.templateTypeService = templateTypeService;
        this.strategies = [
            new FindAllTemplateTypesStrategy({
                templateTypeService: this.templateTypeService
            }),
        ];
    }

    async execute(filter) {
        return await this.executeStrategies(filter, new Result());
    }
}