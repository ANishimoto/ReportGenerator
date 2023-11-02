import { ASCENDING } from "../../../../../../core/enum/OrderEnum.js";
import TemplateTypeFilter from "../TemplateTypeFilter.js";

export default class TemplateTypeFilterMapper {
    constructor() {}

    adapt(filter) {
        const templateTypeFilter = new TemplateTypeFilter();

        const filterKeys = Object.keys(filter);

        for (const key of filterKeys) {
            if (key === 'limit' && filter.limit) {
                templateTypeFilter[key] = Number(filter.limit);
                continue;
            }
            if (key === 'group' && filter.group) {
                templateTypeFilter[key] = [];
                for (const group of filter.group) {
                    templateTypeFilter[key].push(group);    
                }
                continue;
            }
            if (key === 'sort' && filter.sort) {
                templateTypeFilter[key] = []; 
                for (const sort of filter.sort) {
                    templateTypeFilter[key].push([sort, ASCENDING]);    
                }
                continue;
            }
    
            
            if (key === 'fields' && filter.fields) {
                const fieldsKeys = Object.keys(filter.fields);
                for (const fieldKey of fieldsKeys) {
                    templateTypeFilter.concat({[fieldKey]: filter.fields[fieldKey]});
                }
            }
        }

        if (filter.page && filter.limit) {
            templateTypeFilter.offset = ((filter.page - 1) * filter.limit);
        }

        return templateTypeFilter;
    }
}