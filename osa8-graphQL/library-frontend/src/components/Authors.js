import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {

  const [year, setYear] = useState('')

  const [selectedOption, setSelectedOption] = useState(null)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  const authors = props.authors.map(n => n.born ? n : { ...n, born: 'EI OLE!'} )
  
  const options = authors.map(n => ({ value: n.name, label: n.name }) )

  const submit = async (event) => {
    event.preventDefault()
    const name = selectedOption.value
    const syntymavuosi = Number(year)
    editAuthor({ variables: { name, syntymavuosi } })

    setSelectedOption(null)
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>edit author info</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Authors
