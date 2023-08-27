import React, { useState, useReducer } from 'react';
import './styles.css';
import { paste } from '@testing-library/user-event/dist/paste';
import { type } from '@testing-library/user-event/dist/type';

function App() {
  const INITIAL_STATE = {
    number: '0',
    prevNumber: null,
    operation: null,
  }
  
  const ACTIONS = {
    CLEAR: "clear",
    SELECT_NUMBER: "select-number",
    REMOVE_NUMBER: "remove-number",
    OPERATION_SELECTED: "operation-selected",
    ROOT: 'root',
    CHANGE_SIGN: "change-sign",
    COMMA: "comma"
  }
  
  const calcReducer = (state, action) => {
    switch(action.type) {
      case ACTIONS.CLEAR:
        return {
          number: '0',
          prevNumber: null,
          operation: null
        }
      case ACTIONS.SELECT_NUMBER:
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
            number: String(Math.sqrt(parseFloat(state.number)))
          }
        }
        return {
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
          number: state.number.includes('.') ? state.number.replace('.', '') : state.number + '.'
        }
      case ACTIONS.CALCULATE:
        const x = parseFloat(state.prevNumber);
        const y = parseFloat(state.number);
        if (state.operation === '+') {
          return {
            prevNumber: null,
            operation: null,
            number: (String(x + y))
          }
        }
        else if (state.operation === '-') {
          return {
            prevNumber: null,
            operation: null,
            number: (String(x - y))
          }
        }
        else if (state.operation === '*') {
          return {
            prevNumber: null,
            operation: null,
            number: (String(x * y))
          }
        }
        else if (state.operation === '/') {
          if (y === 0) {
            return {
              operation: null,
              prevNumber: 'Error, division by zero',
              number: '0'
            }
          }
          return {
            prevNumber: null,
            operation: null,
            number: (String(x / y))
          }
        }
        return {
          ...state
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
      <button onClick={() => dispatch({type: ACTIONS.OPERATION_SELECTED, payload: '/'})}>&divide;</button>

      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '1'})}>1</button>
      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '2'})}>2</button>
      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '3'})}>3</button>
      <button onClick={() => dispatch({type: ACTIONS.OPERATION_SELECTED, payload: '*'})}>&times;</button>
      
      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '4'})}>4</button>
      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '5'})}>5</button>
      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '6'})}>6</button>
      <button onClick={() => dispatch({type: ACTIONS.OPERATION_SELECTED, payload: '-'})}>&minus;</button>

      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '7'})}>7</button>
      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '8'})}>8</button>
      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '9'})}>9</button>
      <button className='green' onClick={() => dispatch({type: ACTIONS.OPERATION_SELECTED, payload: '+'})}>+</button>

      <button onClick={() =>dispatch({type: ACTIONS.CHANGE_SIGN})}>&#177;</button>
      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '0'})}>0</button>
      <button onClick={() => dispatch({type: ACTIONS.COMMA})}>,</button>
      <button className='blue' onClick={() => dispatch({type: ACTIONS.CALCULATE})}>=</button>
    </div>
  </div>
  );
}

export default App;
