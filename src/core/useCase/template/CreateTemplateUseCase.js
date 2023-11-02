import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateTemplateFieldsStrategy from "../../strategy/template/ValidateTemplateFieldsStrategy.js";
import ActivateTemplateStrategy from "../../strategy/template/ActivateTemplateStrategy.js";
import SaveTemplateStrategy from "../../strategy/template/SaveTemplateStrategy.js";

export default class CreateTemplateUseCase extends AbstractUseCase {
    constructor ({
        templateService = null
    } = {}) {
        super();
        this.templateService = templateService;
        this.strategies = [
            new ValidateTemplateFieldsStrategy({
                templateService: this.templateService
            }),
            new ActivateTemplateStrategy(),
            new SaveTemplateStrategy({
                templateService: this.templateService
            }),
        ];
    }

    async execute({template}) {
        return await this.executeStrategies({template}, new Result());
    }
}