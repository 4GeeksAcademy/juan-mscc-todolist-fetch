import React from "react";



function Test() {

    function filterByDeceased(characters){
        const deceasedList = [];
        for (const id in characters) {          
            
           if (characters[id].status == 'Deceased') deceasedList.push(characters[id].name) 
            
        }

        return deceasedList
    }

    let list

    fetch('https://thesimpsonsapi.com/api/characters')
        .then(response => {
            if(!response.ok) throw new Error(response.statusText)
            return(response.json())
        })
        .then(resp => {
            list = filterByDeceased(resp.results)
        })
        .catch(error => {
            console.log('Something went wrong.', error)
        })
    
    console.log(list)
    return (
        <div className="vh-100 bg-secondary">
            <h1>Hola Mundirijillo</h1>

        </div>
    )
}

export default Test