import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BattleField from './battle/main';
import {IUnit} from './battle/factory/unit';
import UnitFactory from './battle/factory/unit';
import {ARMY} from './battle/army';

const leftArmy: IUnit[] = [];
const rightArmy: IUnit[] = [];

ARMY.forEach((item) => {
    item.units.forEach((unit, index) => {
        const config = {
            position: {
                x: item.side === 'left' ? 1 : 15,
                y: index + 1
            },
            direction: item.side === 'left' ? 'right' : 'left',
            battleSide: item.side
        }

        const newUnit = UnitFactory.create(item.fraction, unit.name, config);
        if (item.side === 'left') {
            leftArmy.push(newUnit);
        } else {
            rightArmy.push(newUnit);
        }
    });
});

ReactDOM.render(<BattleField leftArmy={leftArmy} rightArmy={rightArmy} />, document.getElementById('root'));
