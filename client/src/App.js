import React, { Component } from 'react'
import './App.css';
import SnakeArea from './components/SnakeArea/SnakeArea';
import Snake from './components/Snake/Snake'

const initialState = {
  direction: 'RIGHT',
  speed: 100,
  snakeBody : [
    [0,0],
    [2,0],
    [4,0],
  ]
}

const SpeechRecogniton = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecogniton();

recognition.start()




class App extends Component {

  constructor(props){
    super(props)
    this.state = initialState
    } 


    componentDidMount(){
      // CALLING FUNCTIONALITY THAT CHANGES STATE ON KEY PRESS (WILL CHANGE TO VOICE COMMAND) //
      document.onkeydown = this.onKeyDown
      // CALLING THE MOVE FUNCTION 
      setInterval(this.moveSnake, 200)
      // TESTING VOICE APP // 
      this.voiceCommand()
    }

    componentDidUpdate(){
      this.checkIfOutOfBounds()
      this.checkIfCollapsed()
    }

    voiceCommand = () => {
      recognition.onstart = () => {
        console.log('Voice is active')
      }

      recognition.onresult = (e) => {

        let current = e.resultIndex

        //const transcript = e.result[current][0].transcript;

        
        let transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")
        

        console.log(transcript)
        if(transcript.includes('right') || transcript.includes('bright') || transcript.includes('light') || transcript.includes('east')){
          this.setState({
            direction: 'RIGHT'
          }) 
        } else if (transcript.includes('left') || transcript.includes('west') || transcript.includes('theft') || transcript.includes('best')){
            this.setState({
              direction: 'LEFT'
            })
        } else if (transcript.includes('down') || transcript.includes('drown') || transcript.includes('frown') || transcript.includes('sound')){
          this.setState({
            direction: 'DOWN'
          })
      } else if (transcript.includes('up') || transcript.includes('cup') || transcript.includes('sup') || transcript.includes('pup')){
        this.setState({
          direction: 'UP'
        })
      }

      recognition.onend = () => {
        recognition.start()
      }
    }


    checkIfOutOfBounds = () => {
      let head = this.state.snakeBody[this.state.snakeBody.length - 1];
      if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        this.gameOver()
      }
    }

    checkIfCollapsed(){
      let snake = [...this.state.snakeBody]
      let head = snake[snake.length - 1]
      snake.pop();
      snake.forEach(part => {
        if(head[0] == part[0] && head[1] == part[1]){
          this.gameOver()
        }
      })
    }
  

    onKeyDown = (e) => {
      switch (e.keyCode){
        case 38: 
          this.setState({direction: 'UP'});
          break;
        case 40: 
          this.setState({direction: 'DOWN'});
          break;
        case 37: 
          this.setState({direction: 'LEFT'});
          break;
        case 39: 
          this.setState({direction: 'RIGHT'});
          break;
      }
    }

    moveSnake = () => {
      let parts = [...this.state.snakeBody]
      let head = parts[parts.length - 1]
      switch (this.state.direction){
        case 'RIGHT':
          head = [head[0] + 2, head[1]];
          break;
        case 'LEFT':
          head = [head[0] - 2, head[1]];
          break;
        case 'DOWN':
          head = [head[0], head[1] + 2];
          break;
        case 'UP':
          head = [head[0], head[1] - 2];
          break;
      }
        parts.push(head);
        parts.shift()
        this.setState({
          snakeBody : parts
        })
    }

    gameOver = () => {
      alert('Game Over! The snake length is ' + this.state.snakeBody.length )
      this.setState(initialState)
    }

  render() {
    return (
      <div className="App">
        <SnakeArea>
          <Snake snakeBody = {this.state.snakeBody} />
        </SnakeArea>
      </div>
    )
  }
}
}

export default App
