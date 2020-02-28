import React, { Component } from 'react'
import './SnakeArea.scss'

export default class SnakeArea extends Component {

    

    render() {
        return (
            <div className="SnakeArea">
                {this.props.children}
            </div>
        )
    }
}
