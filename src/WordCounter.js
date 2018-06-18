import React from 'react'
import Editor from './Editor'

import {SUCCESS, FAILURE, WAITING, IDLE} from './Config'


function countWords (text) {
    let wordCount = 0
    let result = text.match(/\w+/g)
    if (result) {wordCount = result.length}
    return wordCount
}

function SaveButton ({onClick}) {

    let makeFunc = function() {
        let env = {history: [1,2,3], count: 0}
        let handler = function (event) {
            event.preventDefault()
            env.count++
            console.log(`my click count is: ${env.count}`)
        }
        return handler
    }

     return (
         <button onClick={onClick}>Save</button>
     )
}

function AlertBox ({status}) {
    if (status === FAILURE) {
        return <div>Failure</div>
    } else if (status === SUCCESS) {
        return <div>Success</div>
    } else if (status === WAITING) {
        return <div>Saving...</div>        
    } else {
        return null
    }
}



class SaveManager extends React.Component {
    constructor (props) {
        super(props)
        this.state = { saveStatus: IDLE}
    }


    save = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch('https://yesno.wtf/api')
                .then( resp => resp.json())
                .then(function(data) {
                    console.log(data)
                    if (data.answer == "yes") {
                    var body = document.querySelector('body'),
                    myImage = new Image();
                    myImage.src = data.image
                    body.appendChild(myImage);
                    resolve()
                    
                    } else  {
                        var body = document.querySelector('body'),
                        myImage = new Image();
                        myImage.src = data.image
                        body.appendChild(myImage);
                        reject()
                    }  
                })
                .catch( err => console.log(err))
            }, 1000)
        })
    }
        
        
    handleSave = (event) => {
        event.preventDefault()
        this.setState(() => ({ saveStatus: WAITING}))
        this.save().then(
            success => (this.setState({saveStatus: SUCCESS})),
            failure => (this.setState({saveStatus: FAILURE}))
        )
    }

    render() {
        return (
            <div>
                <SaveButton onClick={this.handleSave}/>
                <AlertBox status={this.state.saveStatus}/>
            </div>
        )
    }
}




function Counter ({count}) {
    return (
        <p>Word Count: {count}</p>
    )
}






function ProgressBar ({completion}) {
    return (
        <div>
            <progress value={completion}/>
        </div>
    )
}

/*
function WordCounter ({text, targetWordCount}) {
    const wordCount = countWords(text)
    const progress = wordCount / targetWordCount

    function handleTextChange (currentText) {
        console.log(currentText)
    }

    return (    
        <form className="measure pa4 sans-serif" >
            <Editor onTextChange={handleTextChange}/>
            <Counter count={wordCount} />
            <ProgressBar completion={progress} />

        </form>
    )}
*/

class WordCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text:'' }
    }

    handleTextChange = (currentText) => {
        
        // this.setState = function () {
        //     let newState = { text: currentText }
        //     return newState
        // }
        this.setState(() => ({text: currentText}) ) 
    }

    componentDidMount () {
        console.log("Component mounted")
    }

    componentWillUnmount () {
        console.log("Component will unmount")

    }

    render () {
        const {text} = this.state
        const {targetWordCount} = this.props
        const wordCount = countWords(text)
        const progress = wordCount / targetWordCount

        return (
            <form className="measure pa4 sans-serif" >
                <Editor onTextChange={this.handleTextChange}/>
                <Counter count={wordCount} />
                <ProgressBar completion={progress} />
                <SaveManager data={this.state} />
            </form>
        )
    }
}

export default WordCounter
