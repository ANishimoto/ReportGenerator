import AbstractFilter from "../../../../core/filter/AbstractFilter.js";

export default class UserFilterMapper {
    constructor() {}

    adapt(userFilter) {
        const filter = new AbstractFilter();

        const filterKeys = Object.keys(userFilter.filter);

        const fields = {};

        for (const key of filterKeys) {
            if (key === 'limit') {
                filter.limit = userFilter.filter[key];
                continue;
            }
            if (key === 'page') {
                filter.page = userFilter.filter[key];
                continue;
            }
            if (key === 'group') {
                filter.group = userFilter.filter[key].split(',');
                continue;
            }
            if (key === 'sort') {
                filter.sort = userFilter.filter[key].split(',');
                continue;
            }
    
            if (key === 'id') {
                fields[key] = userFilter.filter[key];
                continue;
            }
    
            if (key === 'login') {
                fields[key] = userFilter.filter[key];
                continue;
            }
    
            if (key === 'password') {
                fields[key] = userFilter.filter[key];
                continue;
            }
    
            if (key === 'status') {
                fields[key] = userFilter.filter[key];
                continue;
            }
        }

        if (Object.keys(fields).length > 0) {
            filter.fields = fields;
        }

        return filter;
    }
}