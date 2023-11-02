import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import FindOneTemplateStrategy from "../../strategy/template/FindOneTemplateStrategy.js";

export default class FindOneTemplateUseCase extends AbstractUseCase {
    constructor ({
        templateService = null
    } = {}) {
        super();
        this.templateService = templateService;
        this.strategies = [
            new FindOneTemplateStrategy({
                templateService: this.templateService
            }),
        ];
    }

    async findOneTemplate(filter) {
        return await this.executeStrategies(filter, new Result());
    }
}