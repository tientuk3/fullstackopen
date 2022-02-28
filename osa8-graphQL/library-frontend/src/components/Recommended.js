const Recommended = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books
  console.log(props.user)
  const genre = props.user.me.favoriteGenre

  return (
    <div>
      <h2>Kirjat suosikkigenrestäsi {genre}</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(n => n.genres.includes(genre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
