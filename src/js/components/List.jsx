import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem";

const List = () => {

    const USER = 'Eren'

    const [todos, setTodos] = useState([])
    const [task, setTask] = useState('')
    
    function inputValue(e){
        setTask(e.target.value)  
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && e.target.value != ''){
            console.log([...todos, task])
            setTodos([...todos, task])
            setTask('')
        }
    }

    function addNewTask(){
        fetch('https://playground.4geeks.com/todo/todos/Eren', {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json"
        }
        })
        .then(resp => {
            console.log(resp.ok); // Will be true if the response is successful
            console.log(resp.status); // Status code 201, 300, 400, etc.
            return resp.json(); // Will attempt to parse the result to JSON and return a promise where you can use .then to continue the logic
        })
        .then(data => {
            // This is where your code should start after the fetch is complete
            console.log(data); // This will print the exact object received from the server to the console
        })
        .catch(error => {
            // Error handling
            console.log(error);
        });
    }

    function eraseTask(index){
        const newArr = [...todos]
        newArr.splice(index, 1)
        setTodos(newArr)
        console.log(todos)

    }

    function addNewUser(){
        fetch('https://playground.4geeks.com/todo/users/Eren', {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            }
        })
    }

    useEffect(() => {

        fetch('https://playground.4geeks.com/todo/users/Eren')
        .then(response => {
            if(!response.ok) {
                throw response.status
            }
            return response.json()
        })
        .then(response => {
            console.log(response.todos)
            setTodos(response.todos.map(e => {
               return e.label 
            }))
        }).catch(response => {
            if (response == 404){
                addNewUser()
            } else {console.log(response)}
        })


    }, [])
    
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
                {todos.map((todo, index) => {
                    return (
                        <TodoItem todo={todo} index={index} onDelete={eraseTask} />
                    )
                    })}   
                <li className="list-group-item p-1"><span className="fw-light fst-italic">{todos.length} items left</span></li>
            </ul>
        </div>
    )
}

export default List