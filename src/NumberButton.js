import { ACTIONS } from './App.js';

export default function NumberButton({dispatch, number}) {
    return (
        <button onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: number})}>{number}</button>
    )
}