import IRepository from "./IRepository.js";

export default class ITemplateVersionRepository extends IRepository {
    constructor (connection) {
        super(connection);
    }
}