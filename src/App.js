import React, { useState } from 'react';
import './styles.css';

function App() {
  const[prevNumber, setPrevNumber] = useState(() => {return null});
  const[operation, setOperation] = useState(() => {return null});
  const[number, setNumber] = useState(() => {return '0';});

  function clear() {
    setNumber((prev) => '0');
    setPrevNumber(null);
    setOperation(null);
  }

  function numberSelected(x) {
    if (number !== '0') {
      setNumber((append) => append + x);
    }
    else {
      setNumber(x);
    }
  }

  function removeNumber() {
    if (number.length === 1) {
      setNumber('0');
    }
    else {
      setNumber((append) => append.slice(0, -1));
    }
  }

  function comma() {
    number.includes('.') ? setNumber((append) => append.replace('.', '')) : setNumber((append) => append + '.')
  }

  function operationSelected(x) {
    if (operation === null) {
      setOperation(x);
      setPrevNumber(number);
      setNumber('0');
    }
    else {
      setOperation(x);
    }
  }

  function root() {
    if (parseFloat(number) >= 0) {
      setNumber((x) => (String(Math.sqrt(x))));
    }
    else {
      setNumber('0')
      setPrevNumber('Error, cant get root of negative numbers');
    }
  }

  function changeSign() {
    if (number !== '0') {
      setNumber((x) => -parseFloat(x));
    }
  }

  function calculate() {
    console.log(prevNumber);
    console.log(number);
    const x = parseFloat(prevNumber);
    const y = parseFloat(number);
    setPrevNumber(null)
    setOperation(null)
    if (operation === '+') {
      setNumber(String(x + y));
    }
    else if (operation === '-') {
      setNumber(String(x - y));
    }
    else if (operation === '*') {
      setNumber(String(x * y));
    }
    else if (operation === '/') {
      if (y === 0) {
        setPrevNumber('Error, division by zero');
        setNumber('0');
      }
      else {
        setNumber(String(x / y)); 
      }
    }
  }
  // const [{currNumber, prevNumber, operation}, dispatch] = useReducer(reducer, { number, });

  return (
  <div className='calculator-container'>
    <div className='output'>
      <div className='output-previous'>{prevNumber} {operation}</div>
      <div className='output-current'>{number}</div>
    </div>
    <div className='buttons-grid'>
      <button className='red' onClick={clear}>C</button>
      <button onClick={() => removeNumber()}>&#8592;</button>
      <button onClick={() => root()}>&#8730;</button>
      <button onClick={() => operationSelected('/')}>&divide;</button>

      <button onClick={() => numberSelected('1')}>1</button>
      <button onClick={() => numberSelected('2')}>2</button>
      <button onClick={() => numberSelected('3')}>3</button>
      <button onClick={() => operationSelected('*')}>&times;</button>
      
      <button onClick={() => numberSelected('4')}>4</button>
      <button onClick={() => numberSelected('5')}>5</button>
      <button onClick={() => numberSelected('6')}>6</button>
      <button onClick={() => operationSelected('-')}>&minus;</button>

      <button onClick={() => numberSelected('7')}>7</button>
      <button onClick={() => numberSelected('8')}>8</button>
      <button onClick={() => numberSelected('9')}>9</button>
      <button className='green' onClick={() => operationSelected('+')}>+</button>

      <button onClick={() => changeSign()}>&#177;</button>
      <button onClick={() => numberSelected('0')}>0</button>
      <button onClick={() => comma()}>,</button>
      <button className='blue' onClick={() => calculate()}>=</button>
    </div>
  </div>
  );
}

export default App;
