import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateTemplateTypeFieldsStrategy from "../../strategy/templateType/ValidateTemplateTypeFieldsStrategy.js";
import ActivateTemplateTypeStrategy from "../../strategy/templateType/ActivateTemplateTypeStrategy.js";
import SaveTemplateTypeStrategy from "../../strategy/templateType/SaveTemplateTypeStrategy.js";

export default class CreateTemplateTypeUseCase extends AbstractUseCase {
    constructor ({
        templateTypeService = null
    } = {}) {
        super();
        this.templateTypeService = templateTypeService;
        this.strategies = [
            new ValidateTemplateTypeFieldsStrategy({
                templateTypeService: this.templateTypeService
            }),
            new ActivateTemplateTypeStrategy(),
            new SaveTemplateTypeStrategy({
                templateTypeService: this.templateTypeService
            }),
        ];
    }

    async execute({templateType}) {
        return await this.executeStrategies({templateType}, new Result());
    }
}