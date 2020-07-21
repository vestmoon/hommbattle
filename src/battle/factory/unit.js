import {UNITS} from '../units/stats';

export class UnitFactory {
    create(fraction, unit, otherCfg) {
        return {...UNITS[fraction][unit], ...otherCfg};
    }
}