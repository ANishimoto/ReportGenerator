import { ASCENDING } from "../../../../../../core/enum/OrderEnum.js";
import TemplateVersionFilter from "../TemplateVersionFilter.js";

export default class TemplateVersionFilterMapper {
    constructor() {}

    adapt(filter) {
        const templateVersionFilter = new TemplateVersionFilter();

        const filterKeys = Object.keys(filter);

        for (const key of filterKeys) {
            if (key === 'limit' && filter.limit) {
                templateVersionFilter[key] = Number(filter.limit);
                continue;
            }
            if (key === 'group' && filter.group) {
                templateVersionFilter[key] = [];
                for (const group of filter.group) {
                    templateVersionFilter[key].push(group);    
                }
                continue;
            }
            if (key === 'sort' && filter.sort) {
                templateVersionFilter[key] = []; 
                for (const sort of filter.sort) {
                    templateVersionFilter[key].push([sort, ASCENDING]);    
                }
                continue;
            }
    
            
            if (key === 'fields' && filter.fields) {
                const fieldsKeys = Object.keys(filter.fields);
                for (const fieldKey of fieldsKeys) {
                    templateVersionFilter.concat({[fieldKey]: filter.fields[fieldKey]});
                }
            }
        }

        if (filter.page && filter.limit) {
            templateVersionFilter.offset = ((filter.page - 1) * filter.limit);
        }

        return templateVersionFilter;
    }
}