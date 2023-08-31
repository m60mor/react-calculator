import React, { useEffect, useReducer } from 'react';
import './styles.css';
import NumberButton from './NumberButton';
import OperationButton from './OperationButton';

const INITIAL_STATE = {
  number: '0',
  prevNumber: null,
  operation: null,
}

export const ACTIONS = {
  CLEAR: "clear",
  SELECT_NUMBER: "select-number",
  REMOVE_NUMBER: "remove-number",
  OPERATION_SELECTED: "operation-selected",
  ROOT: 'root',
  CHANGE_SIGN: "change-sign",
  COMMA: "comma",
  CHECK_LENGTH: "check-length"
}

function App() {
  const calcReducer = (state, action) => {
    switch(action.type) {
      case ACTIONS.CLEAR:
        return {
          number: '0',
          prevNumber: null,
          operation: null
        }
      case ACTIONS.SELECT_NUMBER:
        if (state.number.replace('-', '').length >= 12) {
          return {
            ...state
          }
        }
        if (state.number !== '0') {
          return {
            ...state,
            number: state.number + action.payload
          }
        }
        return {
          ...state,
          number: action.payload      
        }
      case ACTIONS.REMOVE_NUMBER:
        if (state.number.replace('.', '').length <= 1){
          return {
            ...state,
            number: '0'
          }
        }
        return {
          ...state,
          number: state.number.slice(0, -1)
        }
      case ACTIONS.OPERATION_SELECTED:
        if (state.operation === null) {
          return {
            operation: action.payload,
            prevNumber: state.number,
            number: '0'
          }
        }
        return {
          ...state,
          operation: action.payload
        }
      case ACTIONS.ROOT:
        if (parseFloat(state.number) >= 0) {
          return {
            ...state,
            number: String(Math.sqrt(parseFloat(state.number))).slice(0, 12)
          }
        }
        return {
          ...state,
          number: '0',
          prevNumber: 'Error, cant get root of negative numbers'
        }
      case ACTIONS.CHANGE_SIGN:
        if (state.number !== '0') {
          return {
            ...state,
            number: String(-parseFloat(state.number))
          }
        }
        return {
          ...state
        }
      case ACTIONS.COMMA:
        return {
          ...state,
          number: state.number.includes('.') ? state.number.replace('.', '') : state.number.replace('-', '').length >= 12 ? state.number : state.number + '.'
        }
      case ACTIONS.CALCULATE:
        const x = parseFloat(state.prevNumber);
        const y = parseFloat(state.number);
        let result = state.number;
        switch(state.operation) {
          case '+':
            result = String(x + y)
            break;
          case '-':
            result = String(x - y);
            break;
          case '\u00D7':
            result = String(x * y)
            break;
          case '\u00F7':
            if (y === 0) {
              return {
                operation: null,
                prevNumber: 'Error, division by zero',
                number: '0'
              }
            }
            result = String(x / y)
            break
        }
        
        const [beforeComma, afterComma] = result.split('.');
        if (result.replace('-', '').length >= 12) {
          if (beforeComma.replace('-', '').length > 10) {
            return {
              prevNumber: null,
              operation: null,
              number: String(parseFloat(state.number).toExponential())
            }
          }
          else {
            return {
              prevNumber: null,
              operation: null,
              number: beforeComma + '.' + afterComma.slice(0, 12 - beforeComma.length - 1)
            }
          }
        }

        return {
          prevNumber: null,
          operation: null,
          number: result
        }
    }
  }

  const[state, dispatch] = useReducer(calcReducer, INITIAL_STATE);


  return (
  <div className='calculator-container'>
    <div className='output'>
      <div className='output-previous'>{state.prevNumber} {state.operation}</div>
      <div className='output-current'>{state.number}</div>
    </div>
    <div className='buttons-grid'>
      <button className='red' onClick={() => dispatch({type: ACTIONS.CLEAR})}>C</button>
      <button onClick={() => dispatch({type: ACTIONS.REMOVE_NUMBER})}>&#8592;</button>
      <button onClick={() => dispatch({type: ACTIONS.ROOT})}>&#8730;</button>
      <OperationButton dispatch={dispatch} operation={'\u00F7'} />

      <NumberButton dispatch={dispatch} number='1' />
      <NumberButton dispatch={dispatch} number='2' />
      <NumberButton dispatch={dispatch} number='3' />
      <OperationButton dispatch={dispatch} operation={'\u00D7'} />
      
      <NumberButton dispatch={dispatch} number='4' />
      <NumberButton dispatch={dispatch} number='5' />
      <NumberButton dispatch={dispatch} number='6' />
      <OperationButton dispatch={dispatch} operation='-' />

      <NumberButton dispatch={dispatch} number='7' />
      <NumberButton dispatch={dispatch} number='8' />
      <NumberButton dispatch={dispatch} number='9' />
      <OperationButton dispatch={dispatch} operation='+' />

      <button onClick={() => dispatch({type: ACTIONS.CHANGE_SIGN})}>&#177;</button>
      <NumberButton dispatch={dispatch} number='0' />
      <button onClick={() => dispatch({type: ACTIONS.COMMA})}>,</button>
      <button className='blue' onClick={() => dispatch({type: ACTIONS.CALCULATE})}>=</button>
    </div>
  </div>
  );
}

export default App;
