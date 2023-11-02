import IRepository from "./IRepository.js";

export default class ITemplateRepository extends IRepository {
    constructor (connection) {
        super(connection);
    }
}