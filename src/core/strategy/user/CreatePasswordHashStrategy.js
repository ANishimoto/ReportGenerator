import User from '../../domain/User.js';
import Result from '../../util/Result.js';
import AbstractStrategy from '../AbstractStrategy.js';
import bcrypt from 'bcryptjs';

export default class CreatePasswordHashStrategy extends AbstractStrategy {
    constructor ({
        result = new Result()
    } = {}) {
        super();
        this.result = result;
    }

    async execute({user, filter = null}, result = this.result) {
    
        const password = user.password;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);

        user.password = hash;

        return {
            entity: {user, filter},
            result
        };
    }
}