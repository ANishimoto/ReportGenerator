export default class AbstractUseCase {
    constructor ({
        strategies = []
    } = {}) {
        this.strategies = strategies;
    }

    async executeStrategies(entity, result = null) {
        for (const strategy of this.strategies) {
            if (result.error && result.error.length > 0) {
                return result;
            }
            const response = await strategy.execute(entity, result);
            entity = response.entity;
            result = response.result;
        }
        return result;
    }
}