import IUserRepository from "../../../../../core/repository/IUserRepository.js";
import { INATIVO } from "../../../../../core/enum/StatusEnum.js";
import UserModel from "../model/UserModel.js";

export default class UserRepository extends IUserRepository {
    constructor () {
        super();
    }

    async save(user) {
        await this.createConnection(UserModel);
        return await this.connection.create(
            {
                login: user.login,
                password: user.password,
                status: user.status,
            }
        );
    }

    async update(user, filter) {
        await this.createConnection(UserModel);
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
        await this.createConnection(UserModel);
        return await this.connection.update(
            {
                status: INATIVO
            },
            filter
        )        
    }

    async findAll(filter) {
        await this.createConnection(UserModel);
        return await this.connection.findAndCountAll(filter);
    }

    async findOne(filter) {
        await this.createConnection(UserModel);
        return await this.connection.findOne(filter);
    }
}