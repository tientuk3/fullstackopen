import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.kurssi.name}</h1>
    </div>

  )

}

const Content = (props) => {
  return (
    <div>
      <Part osa={props.kurssi.parts[0].name} teht={props.kurssi.parts[0].exercises} />
      <Part osa={props.kurssi.parts[1].name} teht={props.kurssi.parts[1].exercises} />
      <Part osa={props.kurssi.parts[2].name} teht={props.kurssi.parts[2].exercises} />
    </div>

  )

}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.osa} {props.teht}
      </p>
    </div>

  )

}

const Total = (props) => {
  const taulu = []
  props.kurssi.parts.forEach(element => taulu.push(element.exercises))
  return (
    <div>
      <p>Number of exercises {taulu.reduce((a, b) => a + b, 0)}</p>
    </div>

  )

}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log(course)
  console.log(course.parts)
  console.log(course.parts[1].exercises)
  return (
    <div>
      <Header kurssi={course} />
      <Content kurssi={course}/>
      <Total kurssi={course} />
    </div>
  )
}

/*
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header kurssi={course} />
      <Content osa1={part1} teht1={exercises1} 
      osa2={part2} teht2={exercises2} 
      osa3={part3} teht3={exercises3} />
      <Total lkm={exercises1 + exercises2 + exercises3} />
    </div>
  )
}
*/

ReactDOM.render(<App />, document.getElementById('root'))