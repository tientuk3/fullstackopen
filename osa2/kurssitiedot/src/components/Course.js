import React from 'react'

const Header = ({course}) => {
   return (
      <div>
        <h2>{course.name}</h2>
      </div>
  
    )
  
}
  
const Content = ({course}) => {
    return (
      <div>
          {course.parts.map(part => <Part key={part.id} part={part} />)}
      </div>
  
    )
  
}
  
const Part = ({part}) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
  
    )
  
}
  
const Total = ({course}) => {
    const taulu = []
    course.parts.forEach(element => taulu.push(element.exercises))
    return (
      <div>
        <p><b>Number of exercises {taulu.reduce((a, b) => a + b, 0)}</b></p>
      </div>
  
    )
  
}
  
const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course}/>
        <Total course={course} />
      </div>
    )
}

export default Course