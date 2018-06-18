import React from 'react'

function Editor ({onTextChange}) {
    function handleChange(event){
        onTextChange(event.target.value)
    }
    return (
        <div>
            <label>Enter your text:</label>
            <textarea onChange={handleChange}></textarea>
        </div>
    )
}

export default Editor