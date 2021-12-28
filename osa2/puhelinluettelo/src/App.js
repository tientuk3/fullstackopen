import React, { useState, useEffect } from 'react'
import database from './services/persons'
import './index.css'

const NimiTaulukko = ({persons, searchName, handlePoista}) => {
    if (searchName === '') {
        return (
            <div>
                <ul>{persons.map(person => <Nimi key={person.name} person={person} handlePoista={handlePoista}/>)}</ul>
            </div>
        )
    } else {
        const lista = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
        return (
            <div>
                <ul>{lista.map(person => <Nimi key={person.name} person={person} handlePoista={handlePoista}/>)}</ul>
            </div>
        )
    }

}

const Nimi = ({person, handlePoista}) => {
    return (
        <>
        <li>{person.name} {person.number} <button onClick={() => handlePoista(person)}>poista</button></li>
        </>
    )
}

const Filtteri = ({arvo, kasittelija}) => {
    return (
        <form>
            <div>
            hae nimellä <input value={arvo} onChange={kasittelija} />
            </div>
        </form>
    )
}

const LisaysLomake = ({nimi, numero, nimikasittelija, numerokasittelija, lisaaja}) => {
    return (
        <form onSubmit={lisaaja}>
            <div>
            name: <input value={nimi} onChange={nimikasittelija} />
            </div>
            <div>
            number: <input value={numero} onChange={numerokasittelija} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

const Ilmoitus = ({msg}) => {
    if (msg === null) return null

    if (msg.color === 'green') {
        return (
            <div className="viestiGreen">{msg.text}</div>
        )
    } else {
        return (
            <div className="viestiRed">{msg.text}</div>
        )
    }
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState(null)

  const hook = () => {
    database
      .getList()
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const shortMessage = (msg) => {
      setMessage(msg)
      setTimeout(() => {setMessage(null)}, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
  
    const nimiObject = {name: newName, number: newNumber}
    setNewName('')
    setNewNumber('')
    if (!(persons.some(person => person.name === nimiObject.name))) {
        database
            .create(nimiObject)
            .then(response => {
                setPersons(persons.concat(response.data))
                shortMessage({ text: 'Lisäys onnistui', color: 'green' })
            })

    } else if (persons.some(person => person.name === nimiObject.name && person.number !== nimiObject.number)) {
        if (window.confirm('Päivitetäänkö numero henkilölle ' + nimiObject.name + '?')) {

            const found = persons.find(person => person.name === nimiObject.name)
            const changedObject = {...found, number: nimiObject.number}
            database
                .update(changedObject)
                .then(response => {
                    setPersons(persons.map(person => person.name !== nimiObject.name ? person : response.data))
                    shortMessage({ text: 'Päivitys onnistui', color: 'green' })
                })
                .catch(error => {
                    setPersons(persons.filter(person => person.id !== found.id))
                    shortMessage({ text: `${nimiObject.name} tietoja ei enää ole olemassa`, color: 'red' })
                })
    
        } else {
            shortMessage( { text: `${nimiObject.name} on jo listalla`, color: 'red' } )
        }
    }
  }

  const poista = (person) => {
    console.log(person)
    if (window.confirm('Haluatko varmasti poistaa ' + person.name + ' listalta?') === true) {
        database
            .remove(person.id)
            .then(response => {setPersons(persons.filter(tulos => tulos.id !== person.id))})
            shortMessage( { text: `${person.name} poistettu`, color: 'green' } )
    }
    
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)
  }


  return (
    <div>

        <h2>Puhelinluettelo</h2>
        <Filtteri arvo={searchName} kasittelija={handleSearchChange}/>

        <h3>Lisää uusi</h3>

        <Ilmoitus msg={message} />

        <LisaysLomake
        nimi={newName}
        numero={newNumber}
        nimikasittelija={handleNameChange}
        numerokasittelija={handleNumberChange}
        lisaaja={addPerson} />

        <h3>Numbers</h3>
        <NimiTaulukko persons={persons} searchName={searchName} handlePoista={poista}/>

        </div>
  )

}

export default App