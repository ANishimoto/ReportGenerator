import TemplateType from '../../domain/TemplateType.js';
import AbstractFilter from '../../filter/AbstractFilter.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';

export default class ValidateTemplateTypeFieldsStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        templateTypeService = null
    } = {}) {
        super();
        this.result = result;
        this.templateTypeService = templateTypeService;
    }

    async execute({templateType, filter = null}, result = this.result) {
        if (!(templateType instanceof TemplateType)) {
            result.error.push('Entidade recebida não é um TemplateType!');
        }
        
        if (!templateType || !templateType.name || templateType.name.length === 0) {
            result.error.push('O campo "name" é obrigatório!');
        }

        if (templateType && templateType.name) {
            const filter = new AbstractFilter({fields: {name: templateType.name}});
            const foundTemplateType = await this.templateTypeService.findOneTemplateType(filter);

            if(foundTemplateType && foundTemplateType.templateType.id != templateType.id)
                result.error.push('Já existe um templateType cadastrado com esse nome!');
        }

        if (result.error.length > 0) {
            result.status = 406;
        }

        return {
            entity: {templateType, filter},
            result
        };
    }
}