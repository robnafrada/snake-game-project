import React, { Component } from 'react'
import './App.css';
import SnakeArea from './components/SnakeArea/SnakeArea';
import Snake from './components/Snake/Snake'
import Food from './components/Food/Food';


// FOOD COORDINATES
const randomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x, y];
}

const initialState = {
  food: randomCoordinates(),
  direction: 'RIGHT',
  speed: 250,
  snakeBody : [
    [0,0],
    [2,0],
    [4,0],
  ],
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
      
      // CALLING THE MOVE FUNCTION 
      setInterval(this.moveSnake, this.state.speed)
      // TESTING VOICE APP // 
      
      this.voiceCommand()
      
      document.onkeydown = this.onKeyDown;
      
      
    }

    componentDidUpdate(){
      this.checkIfOutOfBounds()
      this.checkIfCollapsed()
      this.checkIfEat()
    }

    voiceCommand = () => {
      recognition.onstart = () => {
        
      }

      recognition.onresult = (e) => {

        let current = e.resultIndex
        
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
        } else if (transcript.includes('up') || transcript.includes('sup') || transcript.includes('pup') || transcript.includes('cup') || transcript.includes('sup') || transcript.includes('pup') || transcript.includes('away') || transcript.includes('sup') || transcript.includes('pup') || transcript.includes('alright')){
          this.setState({
            direction: 'UP'
          })
        } 
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

    checkIfEat() {
      let head = this.state.snakeBody[this.state.snakeBody.length-1];
      let food = this.state.food;
      if(head[0] == food[0] && head[1] == food[1]) {
        this.setState({
          food: randomCoordinates()
        })
        this.enlargeSnake();
        this.increaseSpeed();
      }
    }

    enlargeSnake() {
      let newSnake = [...this.state.snakeBody];
      newSnake.unshift([])
      this.setState({
        snakeBody: newSnake
      })
    }

    increaseSpeed() {
      if(this.state.speed > 10) {
        this.setState({
          speed: this.state.speed - 10
        })
      }
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
      console.log('Game Over!')
      alert("Game Over!")
      this.setState(initialState)
    }

  render() {
    return (
      <div className="App">
        <h1 className="snake-title">THE SNAKE GAME</h1>
        <p className="total-score">The snake length is {this.state.snakeBody.length}</p>
        <SnakeArea>
          <Snake snakeBody = {this.state.snakeBody} />
          <Food food={this.state.food}/>
        </SnakeArea>
      </div>
    )
  }
}


export default App
