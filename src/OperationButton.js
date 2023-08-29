import { ACTIONS } from './App.js';

export default function NumberButton({dispatch, operation}) {
    let color = '';
    if (operation === '+')
        color = 'green';
    return (
        <button className={color} onClick={() => dispatch({type: ACTIONS.OPERATION_SELECTED, payload: operation})}>{operation}</button>
    )
}