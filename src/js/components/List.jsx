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
            addNewTask()
            setTask('')
        }
    }

    function addNewTask(){
        fetch('https://playground.4geeks.com/todo/todos/Eren', {
        method: "POST",
        body: JSON.stringify({"label": task,"is_done": false}),
        headers: {
          "Content-Type": "application/json"
        }
        })
        .then(resp => {
            console.log(resp.status); 
            return resp.json(); 
        })
        .then(data => {
            updateList()
            console.log(data);
            console.log(todos)
        })
        .catch(error => {
            // Error handling
            console.log(error);
        });
    }

    function updateList() {
        fetch('https://playground.4geeks.com/todo/users/Eren')
        .then(response => {
            if(!response.ok) {
                throw response.status
            }
            return response.json()
        })
        .then(response => {
            console.log(response)
            setTodos(response.todos.map(e => {
               return {'label': e.label, 'id': e.id} 
            }))
        })
        .catch(error => {
            // Error handling
            console.log(error);
        });
    }

    function eraseTask(index){
        fetch(`https://playground.4geeks.com/todo/todos/${index}`, {
        method: "DELETE"
        })
        .then(resp => {
            console.log(resp.ok);
            console.log(resp.status);
            //return resp.json(); 
        })
        .then(data => {
            updateList()
            console.log(todos); 
        })
        .catch(error => {
            // Error handling
            console.log(error);
        });
        

    }

    function deleteAllTasks(){
        fetch(`https://playground.4geeks.com/todo/users/Eren`, {
        method: "DELETE"
        })
        .then(resp => {
            console.log(resp.ok);
            console.log(resp.status);
            return  
        })
        .then(data => {
            console.log(todos);
            setTodos([])
            addNewUser()
        })
        .catch(error => {
            // Error handling
            console.log(error);
        });
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
               return {'label': e.label, 'id': e.id} 
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
                        <TodoItem todo={todo.label} index={todo.id} onDelete={eraseTask} />
                    )
                    })}   
                <li className="list-group-item p-1 d-flex justify-content-around">
                    <span className="fw-light fst-italic">{todos.length} items left</span>
                    <button className="fw-light fst-italic" onClick={deleteAllTasks}>Delete all tasks</button>
                </li>
            </ul>
        </div>
    )
}

export default List