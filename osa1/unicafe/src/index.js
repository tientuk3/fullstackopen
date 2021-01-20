import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button
        kasittelija={ () => setGood(good+1) }
        teksti="Hyvä"
      />
      <Button
        kasittelija={ () => setNeutral(neutral+1) }
        teksti="Neutraali"
      />
      <Button
        kasittelija={ () => setBad(bad+1) }
        teksti="Huono"
      />
      
      <h2>Tulokset</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.kasittelija}>
      {props.teksti}
    </button>
  )
}


const Statistics = (props) => {
  const { good, neutral, bad } = props
  if (good+bad+neutral !== 0) {
    return (
      <>
      <table>
        <StatisticLine nimike="Hyvä" arvo={good} />
        <StatisticLine nimike="Neutraali" arvo={neutral} />
        <StatisticLine nimike="Huono" arvo={bad} />
        <StatisticLine nimike="Ääniä yhteensä" arvo={good+bad+neutral} />
        <StatisticLine nimike="Keskiarvo" arvo={(good-bad)/(good+bad+neutral)} />
        <StatisticLine nimike="Hyvä-ääniä prosentteina" arvo={100*good/(good+bad+neutral)} merkki="%" />
      </table>
      </>
  )
  }
  return (
    <>
    <p>Ei vielä palautteita</p>
    </>
  )
}

const StatisticLine = ({nimike, arvo, merkki}) => {
  return (
    <tbody>
    <tr>
      <td>{nimike}:</td>
      <td>{arvo} {merkki}</td>
    </tr>
    </tbody>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
