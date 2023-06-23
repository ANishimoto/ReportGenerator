import IUserRepository from "../../../../../core/repository/IUserRepository.js";
import { INATIVO } from "../../../../../core/enum/StatusEnum.js";
import UserModel from "../model/UserModel.js";

export default class UserRepository extends IUserRepository {
    constructor () {
        super(UserModel.init());
    }

    async save(user) {
        return await this.connection.create(
            {
                login: user.login,
                password: user.password,
                status: user.status,
            }
        );
    }

    async update(user, filter) {
        const count = await this.connection.update(
            {
                login: user.login,
                password: user.password,
                status: user.status,
            },
            filter
        );
        user = await this.connection.findOne(
            filter
        );
        return {
            count: count[0],
            user
        };
    }

    async delete(filter) {
        return await this.connection.update(
            {
                status: INATIVO
            },
            filter
        )        
    }

    async findAll(filter) {
        return await this.connection.findAndCountAll(filter);
    }

    async findOne(filter) {
        return await this.connection.findOne(filter);
    }
}