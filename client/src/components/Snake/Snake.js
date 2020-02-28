import React, { Component } from 'react'
import './Snake.scss';
import uuid from 'uuid';

export default class Snake extends Component {

    // THIS FUNCTION CREATES EACH INDIVIDUAL DOT IN THE SNAKE //
    createSnake = () => {
        return this.props.snakeBody.map(part => {
            const style = {
                left: `${part[0]}%`,
                top: `${part[1]}%`
            }
            return <div className="Snake__part" style={style} key={uuid.v4()}/>
        })
    }

    render() {
        return (
            <div className="Snake">
                {this.createSnake()}
            </div>
        )
    }
}
