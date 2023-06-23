import { ASCENDING } from "../../../../../../core/enum/OrderEnum.js";
import UserFilter from "../UserFilter.js";

export default class UserFilterMapper {
    constructor() {}

    adapt(filter) {
        const userFilter = new UserFilter();

        const filterKeys = Object.keys(filter);

        for (const key of filterKeys) {
            if (key === 'limit' && filter.limit) {
                userFilter[key] = Number(filter.limit);
                continue;
            }
            if (key === 'group' && filter.group) {
                userFilter[key] = [];
                for (const group of filter.group) {
                    userFilter[key].push(group);    
                }
                continue;
            }
            if (key === 'sort' && filter.sort) {
                userFilter[key] = []; 
                for (const sort of filter.sort) {
                    userFilter[key].push([sort, ASCENDING]);    
                }
                continue;
            }
    
            
            if (key === 'fields' && filter.fields) {
                const fieldsKeys = Object.keys(filter.fields);
                for (const fieldKey of fieldsKeys) {
                    userFilter.concat({[fieldKey]: filter.fields[fieldKey]});
                }
            }
        }

        if (filter.page && filter.limit) {
            userFilter.offset = ((filter.page - 1) * filter.limit);
        }

        return userFilter;
    }
}