import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import FindAllTemplatesStrategy from "../../strategy/template/FindAllTemplatesStrategy.js";

export default class FindAllTemplatesUseCase extends AbstractUseCase {
    constructor ({
        templateService = null
    } = {}) {
        super();
        this.templateService = templateService;
        this.strategies = [
            new FindAllTemplatesStrategy({
                templateService: this.templateService
            }),
        ];
    }

    async findAllTemplates(filter) {
        return await this.executeStrategies(filter, new Result());
    }
}