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

        if (result.error.length > 0) {
            result.status = 406;
        }

        return {
            entity: {user, filter},
            result
        };
    }
}