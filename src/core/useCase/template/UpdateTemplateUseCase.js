import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateTemplateFieldsStrategy from "../../strategy/template/ValidateTemplateFieldsStrategy.js";
import UpdateTemplateStrategy from "../../strategy/template/UpdateTemplateStrategy.js";

export default class UpdateTemplateUseCase extends AbstractUseCase {
    constructor ({
        templateService = null
    } = {}) {
        super();
        this.templateService = templateService;
        this.strategies = [
            new ValidateTemplateFieldsStrategy({
                templateService: this.templateService
            }),
            new UpdateTemplateStrategy({
                templateService: this.templateService
            }),
        ];
    }

    async updateTemplate({template}, filter) {
        return await this.executeStrategies({template, filter}, new Result());
    }
}