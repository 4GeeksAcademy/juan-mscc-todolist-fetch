import React, {useState} from "react";

const TodoItem = ({todo, index, onDelete}) => {


    const [isHovered, setIsHovered] = useState(undefined)
    

    return (
        <li 
            className="list-group-item d-flex justify-content-between align-items-center p-3" 
            key={index}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(undefined)}>
                {todo}
                <span className= {(isHovered == index) ? 'd-inline' : 'd-none'} onClick={() => onDelete(index)}>
                    <i className="bi bi-x"></i>
                </span>
        </li>
    )
}

export default TodoItem;