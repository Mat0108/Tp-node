import { useState } from "react"

export default () => {
    const [score, setScore] = useState(0);
    const [qty, setQty] = useState(1);
    const HandlerClick = (event) => {
        if (qty){
            setScore(score+qty);
        }
    }
    const handerOnChange = (event) => {
        if (event.target.event !== ""){ 
        let newQty = parseInt(event.target.value);
            setQty(newQty);
        }
        else
        { 
        setQty(1);
        }
    }
    return <>
    <div> {score} </div>
    <input 
        type="number"
        onChange={handerOnChange}
        name="qty"
        value={qty}
    />

    <button onClick={HandlerClick}> Clicker ici</button>
    </>
}