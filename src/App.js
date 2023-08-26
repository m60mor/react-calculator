import React, { useState, useReducer } from 'react';
import './styles.css';

function App() {
  // const[prevNumber, setPrevNumber] = useState(() => {return null});
  // const[operation, setOperation] = useState(() => {return null});
  // const[number, setNumber] = useState(() => {return '0';});

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
    CHANGE_SIGN: "change-sign",
    COMMA: "comma"
  }
  
  const calcReducer = (state, action) => {
    switch(action.type) {
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
      }
  }

  const[state, dispatch] = useReducer(calcReducer, INITIAL_STATE);

  // function clear() {
  //   setNumber((prev) => '0');
  //   setPrevNumber(null);
  //   setOperation(null);
  // }

  // function numberSelected(x) {
  //   if (number !== '0') {
  //     setNumber((append) => append + x);
  //   }
  //   else {
  //     setNumber(x);
  //   }
  // }

  // function removeNumber() {
  //   if (number.length === 1) {
  //     setNumber('0');
  //   }
  //   else {
  //     setNumber((append) => append.slice(0, -1));
  //   }
  // }

  // function comma() {
  //   number.includes('.') ? setNumber((append) => append.replace('.', '')) : setNumber((append) => append + '.')
  // }

  // function root() {
  //   if (parseFloat(number) >= 0) {
  //     setNumber((x) => (String(Math.sqrt(x))));
  //   }
  //   else {
  //     setNumber('0')
  //     setPrevNumber('Error, cant get root of negative numbers');
  //   }
  // }

  // function changeSign() {
  //   if (number !== '0') {
  //     setNumber((x) => -parseFloat(x));
  //   }
  // }

  // function calculate() {
  //   console.log(prevNumber);
  //   console.log(number);
  //   const x = parseFloat(prevNumber);
  //   const y = parseFloat(number);
  //   setPrevNumber(null)
  //   setOperation(null)
  //   if (operation === '+') {
  //     setNumber(String(x + y));
  //   }
  //   else if (operation === '-') {
  //     setNumber(String(x - y));
  //   }
  //   else if (operation === '*') {
  //     setNumber(String(x * y));
  //   }
  //   else if (operation === '/') {
  //     if (y === 0) {
  //       setPrevNumber('Error, division by zero');
  //       setNumber('0');
  //     }
  //     else {
  //       setNumber(String(x / y)); 
  //     }
  //   }
  // }

  return (
  <div className='calculator-container'>
    <div className='output'>
      <div className='output-previous'>{state.prevNumber} {state.operation}</div>
      <div className='output-current'>{state.number}</div>
    </div>
    <div className='buttons-grid'>
      <button className='red'>C</button>
      <button>&#8592;</button>
      <button>&#8730;</button>
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

      <button>&#177;</button>
      <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: '0'})}>0</button>
      <button>,</button>
      <button className='blue'>=</button>
    </div>
  </div>
  );
}

export default App;
