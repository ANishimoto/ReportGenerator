import AbstractFilter from "../../../../core/filter/AbstractFilter.js";

export default class TemplateFilterMapper {
    constructor() {}

    adapt(templateFilter) {
        const filter = new AbstractFilter();

        const filterKeys = Object.keys(templateFilter.filter);

        const fields = {};

        for (const key of filterKeys) {
            if (key === 'limit') {
                filter.limit = templateFilter.filter[key];
                continue;
            }
            if (key === 'page') {
                filter.page = templateFilter.filter[key];
                continue;
            }
            if (key === 'group') {
                filter.group = templateFilter.filter[key].split(',');
                continue;
            }
            if (key === 'sort') {
                filter.sort = templateFilter.filter[key].split(',');
                continue;
            }
    
            if (key === 'id') {
                fields[key] = templateFilter.filter[key];
                continue;
            }
    
            if (key === 'title') {
                fields[key] = templateFilter.filter[key];
                continue;
            }
    
            if (key === 'status') {
                fields[key] = templateFilter.filter[key];
                continue;
            }
        }

        if (Object.keys(fields).length > 0) {
            filter.fields = fields;
        }

        return filter;
    }
}