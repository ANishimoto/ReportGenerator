import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateTemplateTypeFieldsStrategy from "../../strategy/templateType/ValidateTemplateTypeFieldsStrategy.js";
import UpdateTemplateTypeStrategy from "../../strategy/templateType/UpdateTemplateTypeStrategy.js";

export default class UpdateTemplateTypeUseCase extends AbstractUseCase {
    constructor ({
        templateTypeService = null
    } = {}) {
        super();
        this.templateTypeService = templateTypeService;
        this.strategies = [
            new ValidateTemplateTypeFieldsStrategy({
                templateTypeService: this.templateTypeService
            }),
            new UpdateTemplateTypeStrategy({
                templateTypeService: this.templateTypeService
            }),
        ];
    }

    async execute({templateType}, filter) {
        return await this.executeStrategies({templateType, filter}, new Result());
    }
}