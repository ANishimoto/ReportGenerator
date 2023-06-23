export default class AbstractFilter {
    constructor({
        where = {},
        order = [],
        group = null,
        limit = null,
        offset = 0
    } = {}) {
        this.where = where;
        this.order = order;
        this.group = group;
        this.limit = limit;
        this.offset = offset;
    }

    concat(validation) {
        const validationKeys = Object.keys(validation);
        for (const key of validationKeys) {
            this.where[key] = validation[key];
        }
    }

    mountFilter() {
        const filter = {};
        filter.where = this.where

        if (this.order && this.order.length > 0) {
            filter.order = [];
            for (const order of this.order) {
                filter.order.push(order);
            }
        }

        if (this.group && this.group.length > 0) {
            filter.group = [];
            for (const group of this.group) {
                filter.group.push(group);
            }
        }

        if(this.limit){
            filter.limit = this.limit;
        }

        if(this.offset){
            filter.offset = this.offset;
        }
        
        return filter;
    }

}