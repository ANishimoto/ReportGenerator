import IRepository from "./IRepository.js";

export default class IUserRepository extends IRepository {
    constructor (connection) {
        super(connection);
    }
}