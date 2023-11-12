import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import DeleteTemplateStrategy from "../../strategy/template/DeleteTemplateStrategy.js";

export default class DeleteTemplateUseCase extends AbstractUseCase {
    constructor ({
        templateService = null
    } = {}) {
        super();
        this.templateService = templateService;
        this.strategies = [
            new DeleteTemplateStrategy({
                templateService: this.templateService
            }),
        ];
    }

    async execute(filter) {
        return await this.executeStrategies(filter, new Result());
    }
}