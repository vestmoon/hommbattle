import React from 'react';
import './field/main.css';

const FIELD_SIZE = {
  COLUMNS: 15,
  ROWS: 11
}

const CELL_VALUES = {
  EMPTY: 0,
  UNIT: 1,
  WALL: 2,
  MOVE: 4
}

class BattleField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markUp: [],
      field: [],
      currentUnit: {
        position: {
          x: 15,
          y: 1
        },
        direction: 'left',
        battleSide: 'right',
        size: 2,
        speed: 3
      }
    };

    this.svgContainer = {
      width: '61',
      height: '70',
      viewBox: '0 0 60.6217782649107 70',
      path: 'M30.31088913245535 0L60.6217782649107 17.5L60.6217782649107 52.5L30.31088913245535 70L0 52.5L0 17.5Z'
    };

    this._handleCellClick = this._handleCellClick.bind(this);
    this._findPath = this._findPath.bind(this);
  }

  /**
   * Обработчик клика по ячейке поля
   * @param {Event} event 
   */
  _handleCellClick(event) {
    const dataset = event.target.dataset;
    let x = +dataset.col;
    const y = +dataset.row;

    if (!this.state.field[y-1][x-1]) {
      return;
    }

    const unitState = this.state.currentUnit;
    const unitXCoordinate = unitState.position.x;
    const direction = unitXCoordinate - x > 0 ? 'left' : 'right';
    // const isFieldEndCoord = (x !== 1 || x !== FIELD_SIZE.COLUMNS);

    if (unitState.size > 1) {
      if (unitState.battleSide === direction && x !== 1 && Math.abs(x - unitXCoordinate) > 1) {
        x--;
      }
    }

    const currentUnit = Object.assign({}, this.state.currentUnit, {position: {x, y}, direction});
    
    this._findPath(x, y);

    this.setState({
      currentUnit
    });
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
   * Отображение клеток, доступных для перемещения
   * @param {Array} virtualMarkup 
   */
  _setMovableCells(virtualMarkup) {
    let coords = [];
    const virtualField = virtualMarkup;
    const currentUnit = this.state.currentUnit;
    const currentUnitPos = currentUnit.position;
    const currentUnitSpeed = currentUnit.speed;

    let positionOffset = 0;

    for (let j = 0; j <= currentUnitSpeed; j++) {
      const currentRow = currentUnitPos.y + j;

      // сдвиг начала доступных для перемещения клеток в строке
      // так как поле сделано из гексов, то каждая вторая строка сдвигается на одну клетку относительно самой крайней клетки
      if (currentRow !== currentUnitPos.y && currentRow % 2 !== 0) {
        positionOffset++;
      }

      for (let i = 0; i < currentUnitSpeed * 2 + currentUnit.size - j; i++) {
        const oneSideDistance = currentUnitSpeed + currentUnit.size - 1;
        const xCoordinate = (i > oneSideDistance ? currentUnitPos.x - i + oneSideDistance : currentUnitPos.x + i) - positionOffset;
        coords.push(`${xCoordinate} ${currentRow}`);
        
        if (currentRow !== currentRow - j * 2) {
          coords.push(`${xCoordinate} ${currentRow - j * 2}`);
        }
      }
    }

    coords.forEach((item) => {
      const y = +item.split(' ')[1];
      const x = +item.split(' ')[0];
      const isCorrectCoordinate = x > 0 && x <= FIELD_SIZE.COLUMNS && y > 0 && y <= FIELD_SIZE.ROWS;

      if (isCorrectCoordinate && virtualField[y - 1][x - 1] === CELL_VALUES.EMPTY) {
        virtualField[y - 1][x - 1] = CELL_VALUES.MOVE;
      }
    });

    return virtualField;
  }

  /**
   * Заполнение виртуального поля
   * @param {Array} virtualMarkup 
   */
  _setVirtualField() {
    let field = [];
    const currentUnitPos = this.state.currentUnit.position;

    for (let i = 0; i < FIELD_SIZE.ROWS; i++) {
      field.push([]);

      for (let j = 0; j < FIELD_SIZE.COLUMNS; j++) {
        if (i === currentUnitPos.y - 1 && j === currentUnitPos.x - 1) {
          field[i].push(CELL_VALUES.UNIT);
        } else {
          field[i].push(CELL_VALUES.EMPTY);
        }
      }
    }

    field = this._setMovableCells(field);

    return field;
  }

  /**
   * Создание разметки поля боя, виртуальной и физической
   */
  _makeMarkUp() {
    const markUp = [];
    let unitSizeCount = 0;
    const field = this._setVirtualField();

    for (let i = 1; i <= FIELD_SIZE.ROWS; i++) {
      const row = [];
      const rowClass = `battlefield_row battlefield_row--${i % 2 === 0 ? 'even' : 'odd'}`;

      for (let j = 1; j <= FIELD_SIZE.COLUMNS; j++) {
        let cellClassName = "battlefield_cell";
        
        switch (field[i-1][j-1]) {
          case 1:
            cellClassName += ` ${cellClassName}--currentUnit`;
            unitSizeCount++;
            if (unitSizeCount < this.state.currentUnit.size) {
              field[i-1][j] = 1;
            }
            break;
          case 4:
            cellClassName += ` ${cellClassName}--movable`;
            break;
          default:
            break;
        }

        row.push(<svg key={`cell_${i}-${j}`}
                      onClick={this._handleCellClick}
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
      unitSizeCount = 0;
    };
    
    return  {markUp, field};
  }

  componentDidMount() {
    this.setState(this._makeMarkUp());
  }

  componentDidUpdate(prevProps, prevState) {
    const currentPos = this.state.currentUnit.position;
    const prevPos = prevState.currentUnit.position;

    if (currentPos.x !== prevPos.x || currentPos.y !== prevPos.y) {
      this.setState(this._makeMarkUp());
    }
  }


  render() {
    return (
      <div className="battleField_main">
        {this.state.markUp}
      </div>
    );
  }
}

export default BattleField;
