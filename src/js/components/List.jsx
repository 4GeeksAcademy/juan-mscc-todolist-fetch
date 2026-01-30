import React, {useState} from "react";

const List = () => {


    const [todos, setTodos] = useState(['Wash the dishes', 'Walk the dog'])
    const [task, setTask] = useState('')
    
    function inputValue(e){
        setTask(e.target.value)  
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter'){
            console.log([...todos, task])
            setTodos([...todos, task])
            setTask('')
        }
    }
    
    return (
        <div className="w-25 mx-auto d-flex flex-column justify-content-center text-start">
            <input 
                type="text"
                name="task"
                placeholder="Insert your task!"
                value={task}
                onChange={inputValue}
                onKeyDown={handleKeyDown}
                className="p-3 border border-1 rounded-2"
            />
            <ul className="list-group">
                {todos.map((todo, index) =>{
                    return <li className="list-group-item p-3" key={index}>{todo}</li>
                })}
                <li className="list-group-item p-1"><span className="fw-light fst-italic">{todos.length} items left</span></li>
            </ul>
        </div>
    )
}

export default List