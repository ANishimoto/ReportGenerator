import { ASCENDING } from "../../../../../../core/enum/OrderEnum.js";
import TemplateFilter from "../TemplateFilter.js";

export default class TemplateFilterMapper {
    constructor() {}

    adapt(filter) {
        const templateFilter = new TemplateFilter();

        const filterKeys = Object.keys(filter);

        for (const key of filterKeys) {
            if (key === 'limit' && filter.limit) {
                templateFilter[key] = Number(filter.limit);
                continue;
            }
            if (key === 'group' && filter.group) {
                templateFilter[key] = [];
                for (const group of filter.group) {
                    templateFilter[key].push(group);    
                }
                continue;
            }
            if (key === 'sort' && filter.sort) {
                templateFilter[key] = []; 
                for (const sort of filter.sort) {
                    templateFilter[key].push([sort, ASCENDING]);    
                }
                continue;
            }
    
            
            if (key === 'fields' && filter.fields) {
                const fieldsKeys = Object.keys(filter.fields);
                for (const fieldKey of fieldsKeys) {
                    templateFilter.concat({[fieldKey]: filter.fields[fieldKey]});
                }
            }
        }

        if (filter.page && filter.limit) {
            templateFilter.offset = ((filter.page - 1) * filter.limit);
        }

        return templateFilter;
    }
}