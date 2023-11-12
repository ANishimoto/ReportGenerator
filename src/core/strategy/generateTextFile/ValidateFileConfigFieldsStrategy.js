import FileGenerateConfig from '../../domain/FileGenerateConfig.js';
import AbstractFilter from '../../filter/AbstractFilter.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';

export default class ValidateFileConfigFieldsStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        templateService = null
    } = {}) {
        super();
        this.result = result;
        this.templateService = templateService;
    }

    async execute({fileGenerateConfig}, result = this.result) {
        if (!(fileGenerateConfig instanceof FileGenerateConfig)) {
            result.error.push('Entidade recebida não é uma FileGenerateConfig!');
        }

        if (!fileGenerateConfig || !fileGenerateConfig.template.id) {
            result.error.push('É obrigatório selecionar um template!');
        } else {
            const templateFilter = new AbstractFilter({fields: {id: fileGenerateConfig.template.id}});
            const foundTemplate = await this.templateService.findOneTemplate(templateFilter);

            if (!foundTemplate) {
                result.error.push('O template informado não existe!');
            } else {
                if (foundTemplate.template.templateType.name != "TXT") {
                    result.error.push('O tipo do template selecionado não é válido para o tipo de arquivo solicitado!');
                } else {
                    fileGenerateConfig.template = foundTemplate.template;
                }
            } 
        }

        if (!fileGenerateConfig.originalName.length > 0 
                && 
            !fileGenerateConfig.fileName.length > 0 
                && 
            !fileGenerateConfig.path.length > 0) {
            result.error.push('É necessário informar uma fonte de dados!');
        }

        if (result.error.length > 0) {
            result.status = 406;
        } else {
            result.status = 200
        }

        return {
            entity: {fileGenerateConfig},
            result
        };
    }
}