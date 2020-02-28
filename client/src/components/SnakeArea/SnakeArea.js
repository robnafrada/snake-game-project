import React, { Component } from 'react'
import './SnakeArea.scss'
import grass from '../../assets/images/grass-land.jpg';

export default class SnakeArea extends Component {

    

    render() {
        return (
            <div className="SnakeArea">
                {this.props.children}
                <img className="grass-landscape" src={grass} alt="grass landscape"/>
            </div>
        )
    }
}
