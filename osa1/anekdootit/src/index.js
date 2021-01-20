import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



const Button = (props) => {
  return (
    <button onClick={props.kasittelija}>
      {props.teksti}
    </button>
  )
}

const Paras = ({paras, anekdootit, pisteet}) => {
  if (pisteet[paras] == 0) {
    return null
  }
  return anekdootit[paras]
}

const ParasAanet = ({paras, pisteet}) => {
  if (pisteet[paras] == 0) {
    return null
  }
  return pisteet[paras] + " ääntä"
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [paras, setParas] = useState(0)
  const [pisteet, setPiste]= useState((new Array(anecdotes.length)).fill(0))

  const aanesta = () => {
    const paivitys = [...pisteet]
    paivitys[selected] += 1
    setPiste(paivitys)
    if (paivitys[selected] > paivitys[paras]) {
      setParas(selected)
    }
  }

  console.log(pisteet)
  console.log(paras)
  console.log(pisteet[paras])
  console.log(selected)
  console.log(pisteet[selected])
  return (
    <div>
      <h1>Päivän anekdootti</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>{pisteet[selected]} ääntä</p>
      <Button
        kasittelija={ () => setSelected(Math.floor(Math.random() * anecdotes.length)) }
        teksti="Satunnainen oneliner"
      />
      <Button
        kasittelija={aanesta}
        teksti="Äänestä tätä"
      />
      <h2>Eniten ääniä saanut lausahdus</h2>
      <p><Paras paras={paras} anekdootit={anecdotes} pisteet={pisteet}/></p>
      <p><ParasAanet paras={paras} pisteet={pisteet}/></p>

    </div>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)