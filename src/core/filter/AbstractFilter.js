export default class AbstractFilter {
    constructor({
        limit = null,
        sort = null,
        group = null,
        page = null,
        fields = null
    } = {}) {
        this.fields = fields;
        this.sort = sort;
        this.group = group;
        this.limit = limit;
        this.page = page;
    }
}