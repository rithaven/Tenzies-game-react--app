
import Die from "./components/Die"
import { useEffect,useState } from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    

    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main className="flex flex-col items-center justify-between h-full p-4 mt-16 ">
            {tenzies && <Confetti />}
            <h2 className="m-auto text-4xl font-bold ">Tenzies</h2>
            <p className="items-center p-4 mt-0 text-lg font-normal text-center text-gray-700">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="grid grid-cols-5 mx-auto mb-10 gap-14">
                {diceElements}
            </div>
            <button 
                className="w-40 m-auto text-xl text-white bg-indigo-600 border-none rounded-md shadow-inner cursor-pointer h-14 hover:bg-black shadow-black" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}