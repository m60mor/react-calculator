import React from 'react';
import './styles.css';

function App() {
  return (
  <div className='calculator-container'>
    <div className='output'>
      <div className='output-previous'>123,0 *</div>
      <div className='output-current'>5325,7</div>
    </div>
    <div className='buttons-grid'>
      <button className='red'>C</button>
      <button>&#8592;</button>
      <button>&#8730;</button>
      <button>&divide;</button>

      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>&times;</button>
      
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>&minus;</button>

      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button className='green'>+</button>

      <button>&#177;</button>
      <button>0</button>
      <button>,</button>
      <button className='blue'>=</button>
    </div>
  </div>
  );
}

export default App;
