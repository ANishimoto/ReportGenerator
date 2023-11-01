import User from '../../../../core/domain/User.js';
import UserDTOForList from '../response/UserDTOForList.js';
import AbstractMapper from './AbstractMapper.js';

export default class UserMapper extends AbstractMapper {
    constructor() {
        super();
    }

    adaptRequestDTOToEntity(dto) {
        const user = new User();
        
        user.id = dto.id;
        user.login = dto.login;
        user.password = dto.password;
        user.confirm_password = dto.confirm_password;
        user.status = dto.status;

        return user;
    }

    adaptEntityToResponseDTOForList(entity) {
        const dto = new UserDTOForList();
        
        dto.id = entity.id;
        dto.login = entity.login;
        dto.status = entity.status;

        return dto;
    }
}