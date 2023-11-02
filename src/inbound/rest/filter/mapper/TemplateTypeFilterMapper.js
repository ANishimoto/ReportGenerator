import AbstractFilter from "../../../../core/filter/AbstractFilter.js";

export default class TemplateTypeFilterMapper {
    constructor() {}

    adapt(templateTypeFilter) {
        const filter = new AbstractFilter();

        const filterKeys = Object.keys(templateTypeFilter.filter);

        const fields = {};

        for (const key of filterKeys) {
            if (key === 'limit') {
                filter.limit = templateTypeFilter.filter[key];
                continue;
            }
            if (key === 'page') {
                filter.page = templateTypeFilter.filter[key];
                continue;
            }
            if (key === 'group') {
                filter.group = templateTypeFilter.filter[key].split(',');
                continue;
            }
            if (key === 'sort') {
                filter.sort = templateTypeFilter.filter[key].split(',');
                continue;
            }
    
            if (key === 'id') {
                fields[key] = templateTypeFilter.filter[key];
                continue;
            }
    
            if (key === 'name') {
                fields[key] = templateTypeFilter.filter[key];
                continue;
            }
    
            if (key === 'status') {
                fields[key] = templateTypeFilter.filter[key];
                continue;
            }
        }

        if (Object.keys(fields).length > 0) {
            filter.fields = fields;
        }

        return filter;
    }
}