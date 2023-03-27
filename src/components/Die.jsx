import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="flex items-center justify-center w-16 h-16 rounded-md shadow-md cursor-pointer" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="text-3xl">{props.value}</h2>
        </div>
    )
}