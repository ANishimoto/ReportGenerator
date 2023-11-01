import User from '../../domain/User.js';
import AbstractFilter from '../../filter/AbstractFilter.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';

export default class ValidateUserFieldsStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        userService = null
    } = {}) {
        super();
        this.result = result;
        this.userService = userService;
    }

    async execute({user, filter = null}, result = this.result) {
        if (!(user instanceof User)) {
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

        if (user.password != user.confirm_password) {
            result.error.push('O campo "password" e o campo "confirm_password" não são iguais!');
        }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/;

        if (!regex.test(user.password)) {
            result.error.push('O campo "password" deve conter ao menos uma letra minúscula, uma letra maiúscula e um caractere especial!');
        }

        if (user && user.login) {
            const filter = new AbstractFilter({fields: {login: user.login}});
            const foundUser = await this.userService.findOneUser(filter);

            if(foundUser && foundUser.user.id != user.id)
                result.error.push('Já existe um usuário cadastrado com esse login!');
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