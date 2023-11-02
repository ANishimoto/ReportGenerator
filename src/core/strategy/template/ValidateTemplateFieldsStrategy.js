import Template from '../../domain/Template.js';
import AbstractFilter from '../../filter/AbstractFilter.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';

export default class ValidateTemplateFieldsStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        templateService = null
    } = {}) {
        super();
        this.result = result;
        this.templateService = templateService;
    }

    async execute({template, filter = null}, result = this.result) {
        if (!(template instanceof Template)) {
            result.error.push('Entidade recebida não é um Template!');
        }
        
        if (!template || !template.title || template.title.length === 0) {
            result.error.push('O campo "title" é obrigatório!');
        }

        if (!template || !template.templateType || !template.templateType.id) {
            result.error.push('É obrigatório selecionar um tipo de template!');
        }
        
        if (!template || !template.templateVersions.length > 0 || !(template.templateVersions[0].content.length > 0)) {
            result.error.push('O campo "content" é obrigatório!');
        }

        if (template && template.title) {
            const filter = new AbstractFilter({fields: {title: template.title}});
            const foundTemplate = await this.templateService.findOneTemplate(filter);

            if(foundTemplate && foundTemplate.template.id != template.id)
                result.error.push('Já existe um template cadastrado com esse título!');
        }

        if (result.error.length > 0) {
            result.status = 406;
        }

        return {
            entity: {template, filter},
            result
        };
    }
}