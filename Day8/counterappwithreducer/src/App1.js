import { useReducer,useState } from 'react';
import './App.css';

function countReducer(state,action)
{
    switch (action.type)
    {
        case 'increment':
            return {
                count: state.count + action.payload,
               
             };
        case 'decrement':
            return { count: state.count - action.payload };
        case 'reset':
            return { count: 0 };
        default:
            return state;

    }

   
}

function App1() {

    const [state,dispatch] = useReducer(countReducer,{ count: 0});

    const [inputValue, setInputValue] = useState(1);
    

    


    return (
        <div className="App">

            <div className='box'>

                <p>{state.count}</p>
                <input type="number" value={inputValue} onChange={(e)=>setInputValue(Number(e.target.value))} />
                <button onClick={()=>dispatch({type:'increment',payload:inputValue})} className='add' >ADD</button>
                <button onClick={() => dispatch({ type: 'decrement',payload:inputValue })} className='sub' >SUB</button>
                <button onClick={() => dispatch({ type: 'reset' }) } className='reset' >RESET</button>
              
            </div>

        </div>
    );
}

export default App1;
