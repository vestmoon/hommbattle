import {UNITS} from '../units/stats';

class UnitFactory {
    constructor() {
        UnitFactory._instance = this;
    }

    create(fraction, unit, otherCfg) {
        return {...UNITS[fraction][unit], ...otherCfg};
    }
    
    getInstance() {
        return UnitFactory._instance;
    }
}

export default new UnitFactory().getInstance();