import { useState } from 'react'
import Select from 'react-select'

const Books = (props) => {

  const [selectedOption, setSelectedOption] = useState(null)

  if (!props.show) {
    return null
  }

  const books = props.books

  let genres = []
  for (var i of books) {
    if (i.genres) {
      for (var j of i.genres) {
        if (!genres.includes(j)) { genres.push(j) }
      }
    }
  }
  const options = genres.map(n => ({ value: n, label: n }) )
  options.push({ value: 'all', label: 'Näytä kaikki' })

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(n => (selectedOption === null || selectedOption.value === 'all') || n.genres.includes(selectedOption.value))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <div>
          <h3>suodata genren perusteella</h3>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
    </div>
  )
}

export default Books
