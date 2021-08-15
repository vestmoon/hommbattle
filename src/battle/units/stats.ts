/**
 * Интерфейс характеристик юнита из замка
 */
export interface ICastleUnit {
    attack: number;
    defence: number;
    damage: number[];
    health: number;
    speed: number;
    size: number;
    fly: boolean;
    range: boolean;
}

/**
 * Интерфейс конкретного юнита (имя + характеристики)
 */
interface ICastleUnits {
    [key: string]: ICastleUnit;
}

/**
 * Интерфейс армии замка
 */
interface IArmy {
    [key: string]: ICastleUnits
}

/**
 * Набор всех юнитов
 */
export const UNITS: IArmy = {
    castle: {
        spearman: {
            attack: 4,
            defence: 5,
            damage: [1, 3],
            health: 10,
            speed: 4,
            size: 1,
            fly: false,
            range: false
        },
        archer: {
            attack: 6,
            defence: 3,
            damage: [2, 3],
            health: 10,
            speed: 4,
            size: 1,
            fly: false,
            range: true
        },
        griffin: {
            attack: 8,
            defence: 8,
            damage: [3, 6],
            health: 25,
            speed: 6,
            size: 2,
            fly: true,
            range: false
        },
        swordsman: {
            attack: 10,
            defence: 12,
            damage: [6, 9],
            health: 35,
            speed: 5,
            size: 1,
            fly: false,
            range: false
        },
        monk: {
            attack: 12,
            defence: 7,
            damage: [10, 12],
            health: 30,
            speed: 5,
            size: 1,
            fly: false,
            range: true
        },
        cavalryman: {
            attack: 15,
            defence: 15,
            damage: [15, 25],
            health: 100,
            speed: 7,
            size: 2,
            fly: false,
            range: false
        },
        angel: {
            attack: 20,
            defence: 20,
            damage: [50, 50],
            health: 200,
            speed: 12,
            size: 2,
            fly: true,
            range: false
        }
    }
};
