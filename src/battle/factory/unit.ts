import {UNITS} from '../units/stats';
import {FIELD_SIZE, CELL_VALUES} from '../constants';

export interface IUnit {
    id: string;
    position: {
        x: number;
        y: number;
    };
    direction: string;
    battleSide: string;
    meleeZone: string[];
    moveZone: string[];
    speed: number;
    size: number;
}

interface IUnitsDictionary<TValue> {
    [id: string]: TValue;
}

class UnitFactory {
    private static _instance: UnitFactory;
    private _indexedUnits: IUnitsDictionary<IUnit>;

    private constructor() {
        this._indexedUnits = {};
    }

    /**
     * Создание юнита
     * @param {string} fraction - фракция/замок юнита
     * @param {string} name - название юнита
     * @param {IUnit} otherCfg - конфигурация юнита
     */
    public create(fraction: string, name: string, otherCfg: {}): IUnit {
        const unit = {...UNITS[fraction][name], ...otherCfg};
        let id = this._generateId();
        unit.meleeZone = this._getMeleeZone(unit);
        unit.moveZone = this._getMoveZone(unit);

        while (this._indexedUnits[id]) {
            id = this._generateId();
        }
        
        unit.id = id;
        this._indexedUnits[id] = unit;
        return unit;
    }

    /**
     * Обновление юнита
     * @param {IUnit} unit - конфигурация юнита 
     */
    public refresh(unit: IUnit): IUnit {
        let refreshedUnit = this.getUnitById(unit.id);
        if (refreshedUnit.position.x !== unit.position.x || refreshedUnit.position.y !== unit.position.y) {
            unit.meleeZone = this._getMeleeZone(unit);
            unit.moveZone = this._getMoveZone(unit);
        }
        refreshedUnit = {...refreshedUnit, ...unit};
        return {...{}, ...refreshedUnit};
    }

    /**
     * Поиск юнита по id
     * @param {string} id - id юнита 
     */
    private getUnitById(id: string): IUnit {
        return this._indexedUnits[id];
    }

    /**
     * Генерация ID
     */
    private _generateId(): string {
        return `_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Сохранение пограничной зоны для контакта с юнитом
     * @param {IUnit} unit - конфиг юнита
     */
    private _getMeleeZone(unit: IUnit): string[] {
        const cfg = {...unit, ...{speed: 1}};
        return this._getMoveZone(cfg);
    }

    /**
     * Сохранение доступных для передвижения клеток юнита
     * @param {IUnit} unit - конфиг юнита
     */
    private _getMoveZone(unit: IUnit): string[] {
        let coords = [];
        const currentUnitPos = unit.position;
        const currentUnitSpeed = unit.speed;
        const currentUnitSide = unit.battleSide;

        let positionOffset = 0;

        for (let j = 0; j <= currentUnitSpeed; j++) {
            const currentRow = currentUnitPos.y + j;

            // сдвиг начала доступных для перемещения клеток в строке
            // так как поле сделано из гексов, то каждая вторая строка в поле для передвижения
            // сдвигается на одну клетку относительно самой крайней клетки
            if (currentRow !== currentUnitPos.y && currentRow % 2 !== 0) {
                positionOffset++;
            }

            // рассчет возможных клеток для передвижения вокруг юнита с учетом его скорости и размера
            // если большой юнит смотрит вправо, то надо сместить координаты хода вправо на одну клетку и увеличить дальность хода на 1
            for (let i = 0; i < currentUnitSpeed * 2 + unit.size - j; i++) {
                const oneSideDistance = currentUnitSpeed + (currentUnitSide === 'left' ? unit.size - 1 : 0);
                const xCoordinate = (i > oneSideDistance ? currentUnitPos.x - i + oneSideDistance : currentUnitPos.x + i) - positionOffset;
                coords.push(`${xCoordinate} ${currentRow}`);
                
                if (currentRow !== currentRow - j * 2) {
                    coords.push(`${xCoordinate} ${currentRow - j * 2}`);
                }
            }
        }

        // обрезка невозможных для хода координат
        const result = coords.filter((item) => {
            const y = +item.split(' ')[1];
            const x = +item.split(' ')[0];
            const isFieldCell = x >= 1 && x <= FIELD_SIZE.COLUMNS && y >= 1 && y <= FIELD_SIZE.ROWS;
            let isNotUnitCell = x !== currentUnitPos.x || y !== currentUnitPos.y;
            let isBigUnitCell = false;

            if (unit.size === CELL_VALUES.BIG_UNIT) {
                const bigUnitSecondCell = unit.battleSide === 'right' ? currentUnitPos.x - 1 : currentUnitPos.x + 1;
                isBigUnitCell = x === bigUnitSecondCell && y === currentUnitPos.y;
            }
            return isFieldCell && isNotUnitCell && !isBigUnitCell;
        });

        return result;
    }
    
    public static getInstance(): UnitFactory {
        if (!UnitFactory._instance) {
            UnitFactory._instance = new UnitFactory();
        }

        return UnitFactory._instance;
    }
}

export default UnitFactory.getInstance();