import React from 'react';
import './field/main.css';
import {FIELD_SIZE, CELL_VALUES, CELL_SVG} from './constants';
import UnitFactory from './factory/unit';

let FIELD = [];

class BattleField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markUp: [],
      army: {
        left: props.leftArmy,
        right: props.rightArmy
      },
      units: []
    };

    this.svgContainer = CELL_SVG;

    this._handleCellClick = this._handleCellClick.bind(this);
    this._findPath = this._findPath.bind(this);
  }

  async componentDidMount() {
    const army = this.state.army;
    const units = [];
    for (let side in army) {
      army[side].forEach((unit) => units.push(unit));
    }
    units.sort((a, b) => b.speed - a.speed);

    this._setVirtualField(true);
    this._setMovableCells(units[0]);
    await this.setState({
      units: units,
      currentUnit: units[0],
      markUp: this._makeMarkUp()});
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.currentUnit) {
      const currentUnit = this.state.currentUnit;
      const currentPos = currentUnit.position;
      const prevPos = prevState.currentUnit.position;

      if (currentPos.x !== prevPos.x || currentPos.y !== prevPos.y) {
        const newUnit = UnitFactory.refresh(currentUnit);
        this._setVirtualField();
        this._setUnitPositionInField(newUnit, prevState.currentUnit);
        this._setMovableCells(newUnit);
        await this.setState({markUp: this._makeMarkUp()});
      }
    }
  }

  /**
   * Обработчик клика по ячейке поля
   * @param {Event} event 
   */
  async _handleCellClick(event) {
    if (event.target.tagName !== 'svg') {
      return;
    }

    const dataset = event.target.dataset;
    let x = +dataset.col;
    const y = +dataset.row;
    const row = FIELD[y-1];
    const coord = row[x-1];
    const currentCoord = this.state.currentUnit.position;

    // игнорирование занятых клеток
    if (coord === CELL_VALUES.EMPTY || (currentCoord.x === x && currentCoord.y === y)) {
      return;
    }

    const unitState = this.state.currentUnit;
    const unitXCoordinate = unitState.position.x;
    const direction = unitXCoordinate - x > 0 ? 'left' : 'right';

    // рассчет хода для большого юнита
    if (unitState.size === CELL_VALUES.BIG_UNIT) {
      if (unitState.battleSide === 'left' && direction === 'right') {
        if (row[x] !== CELL_VALUES.MOVE) {
          x--;
        }
      } else if (unitState.battleSide === 'right' && direction === 'left') {
        if (row[x - CELL_VALUES.BIG_UNIT] !== CELL_VALUES.MOVE) {
          x++;
        }
      }
    }

    const currentUnit = Object.assign({}, this.state.currentUnit, {position: {x, y}, direction});

    await this.setState({currentUnit});

    this._findPath(x, y);
  }

  /**
   * Поиск пути
   * @param {string} x - начальная координата по оси x 
   * @param {string} y - начальная координата по оси y 
   */
  _findPath(x, y) {
    // const reachebleCells = [];
  }

  /**
   * Создание разметки поля боя, виртуальной и физической
   */
  _makeMarkUp() {
    const markUp = [];

    for (let i = 1; i <= FIELD_SIZE.ROWS; i++) {
      const row = [];
      const rowClass = `battlefield_row battlefield_row--${i % 2 === 0 ? 'even' : 'odd'}`;

      for (let j = 1; j <= FIELD_SIZE.COLUMNS; j++) {
        let cellClassName = "battlefield_cell";
        
        switch (FIELD[i-1][j-1]) {
          case CELL_VALUES.UNIT:
          case CELL_VALUES.BIG_UNIT:
            cellClassName += ` ${cellClassName}--currentUnit`;
            break;
          case CELL_VALUES.MOVE:
            cellClassName += ` ${cellClassName}--movable`;
            break;
          default:
            break;
        }

        row.push(<svg key={`cell_${i}-${j}`}
                      data-row={i}
                      data-col={j}
                      className={cellClassName}
                      width={this.svgContainer.width}
                      height={this.svgContainer.height}
                      viewBox={this.svgContainer.viewBox}>
                        <path d={this.svgContainer.path}></path>
                  </svg>);
      }
      markUp.push(<div key={`row_${i}`} className={rowClass}>{row}</div>);
    };
    
    return  markUp;
  }

  /**
   * Заполнение виртуального поля
   */
  _setVirtualField(firstInit) {
    const army = this.state.army;

    for (let i = 0; i < FIELD_SIZE.ROWS; i++) {
      if (firstInit) {
        FIELD.push([]);
      }

      for (let j = 0; j < FIELD_SIZE.COLUMNS; j++) {
        if (firstInit) {
          for (let side in army) {
            const unit = army[side][i];
            
            if (i === unit?.position.y - 1 && j === unit?.position.x - 1) {
              this._setUnitPositionInField(unit);
            }
          }
        }

        if (!FIELD[i][j] || FIELD[i][j] === CELL_VALUES.MOVE) {
          FIELD[i][j] = CELL_VALUES.EMPTY;
        }
      }
    }
  }

  /**
   * Установка позиции юнита в виртуальном поле
   * @param {*} unit - текущее состояние юнита
   * @param {*} prevUnit - предыдущее состояние юнита
   */
  _setUnitPositionInField(unit, prevUnit) {
    const unitPos = unit.position;
    const unitPosX = unitPos.y - 1;
    const unitPosY = unitPos.x - 1;
    FIELD[unitPosX][unitPosY] = unit.size;

    if (prevUnit) {
      FIELD[prevUnit.position.y - 1][prevUnit.position.x - 1] = CELL_VALUES.EMPTY;
    }
      
    /**
     * если юнит большой, то надо заполнять +1 ячейку под него
     * при этом надо учитывать направление и сторону юнита на поле
     * и размещать доп. клетку слева или справа в зависимости от стороны
     */
    if (unit.size === CELL_VALUES.BIG_UNIT) {
      const bigUnitSecondX = unit.battleSide === 'left' ? unitPosY + 1 : unitPosY - 1;
      FIELD[unitPosX][bigUnitSecondX] = unit.size;

      if (prevUnit) {
        const prevUnitSecondX = unit.battleSide === 'left' ? prevUnit.position.x + 1 : prevUnit.position.x - CELL_VALUES.BIG_UNIT;
        const isSameCell = unitPosY === prevUnitSecondX && unitPosX === prevUnit.position.y - 1;
        FIELD[prevUnit.position.y - 1][prevUnitSecondX] = isSameCell ? CELL_VALUES.BIG_UNIT : CELL_VALUES.EMPTY;
      }
    }
  }

  /**
   * Отображение клеток, доступных для перемещения
   */
  _setMovableCells(unit) {
    // обрезка невозможных для хода координат
    unit.moveZone.forEach((item) => {
      const y = +item.split(' ')[0] - 1;
      const x = +item.split(' ')[1] - 1;

      if (FIELD[x][y] === CELL_VALUES.EMPTY) {
        FIELD[x][y] = CELL_VALUES.MOVE;
      }
    });
  }

  render() {
    return (
      <div className="battleField_main" onClick={this._handleCellClick}>
        {this.state.markUp}
      </div>
    );
  }
}

export default BattleField;
