import React from 'react';

const Food = (props) => {
    const style = {
        left:  `${props.foodItem[0]}%`,
        top:   `${props.foodItem[1]}%`
    }
    return(
        <div className="food" style={style}></div>
    )
}

export default Food; 