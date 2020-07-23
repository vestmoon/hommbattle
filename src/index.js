import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BattleField from './battle/main';
import UnitFactory from './battle/factory/unit';
import {ARMY} from './battle/army';

const army = {
    left: [],
    right: []
};

for (let side in ARMY) {
    const sideArmy = ARMY[side];
    sideArmy.units.forEach((unit, index) => {
        const config = {
            position: {
                x: side === 'left' ? 1 : 15,
                y: index + 1
            },
            direction: side === 'left' ? 'right' : 'left',
            battleSide: side
        }
        army[side].push(UnitFactory.create(sideArmy.fraction, unit.name, config));
    });
}

ReactDOM.render(<BattleField army={army}/>, document.getElementById('root'));
