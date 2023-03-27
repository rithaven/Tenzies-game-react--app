import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="flex items-center justify-center w-12 h-12 rounded-sm shadow-md cursor-pointer" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="text-3xl">{props.value}</h2>
        </div>
    )
}