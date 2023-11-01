import User from "../../../../../../core/domain/User.js";
import UserModel from "../UserModel.js";
import AbstractMapper from "./AbstractMapper.js";


export default class UserMapper extends AbstractMapper {
    constructor() {
        super();
    }

    adapt(object) {
        if (object instanceof UserModel)
            return this.adaptModelToEntity(object);
        
        return object;
    }

    adaptModelToEntity(model) {
        const entity = new User();
        
        entity.id = model.id;
        entity.login = model.login;
        entity.status = model.status;

        return entity;
    }
}