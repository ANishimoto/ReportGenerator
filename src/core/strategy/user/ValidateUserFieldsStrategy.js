import User from '../../domain/User.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';

export default class ValidateUserFieldsStrategy extends AbstractStrategy {
    constructor ({
        result = new Result()
    } = {}) {
        super();
        this.result = result;
    }

    async execute({user, filter = null}, result = this.result) {
        if (!typeof user === new User()) {
            result.error.push('Entidade recebida não é um usuário!');
        }
        
        if (!user || !user.login || user.login.length === 0) {
            result.error.push('O campo "login" é obrigatório!');
        }
        
        if (!user || !user.password || user.password.length === 0) {
            result.error.push('O campo "password" é obrigatório!');
        }

        if (user.password.length < 8) {
            result.error.push('O campo "password" deve conter no mínimo 8 caracteres!');
        }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/;

        if (!regex.test(user.password)) {
            result.error.push('O campo "password" deve conter ao menos uma letra minúscula, uma letra maiúscula e um caractere especial!');
        }

        if (result.error.length > 0) {
            result.status = 406;
        }

        return {
            entity: {user, filter},
            result
        };
    }
}