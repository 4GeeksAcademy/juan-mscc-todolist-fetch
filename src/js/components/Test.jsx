import React, {useState, useEffect} from "react";



function Test() {
    //console.log("RENDER");
    function filterByDeceased(characters){
        const list = [];
        for (const character of characters) {          
            if (character.status == 'Deceased') {list.push(character.name)}
        }

        return list
    }

    let [deceasedList, setDeceasedList] = useState([])

    useEffect(() => {
        //console.log("EFFECT RUN");
        fetch('https://thesimpsonsapi.com/api/characters')
            .then(response => {
                if(!response.ok) throw new Error(response.statusText)
                return(response.json())
            })
            .then(resp => {
                console.log(resp.results)
                setDeceasedList(filterByDeceased(resp.results))
            })
            .catch(error => {
                console.log('Something went wrong.', error)
        })
    }, [])
    

    return (
        <div className="vh-100 bg-secondary">
            <h1>Hola Mundirijillo</h1>
            <p>{deceasedList}</p>
        </div>
    )
}

export default Test