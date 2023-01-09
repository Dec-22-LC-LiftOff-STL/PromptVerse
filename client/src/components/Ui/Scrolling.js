import React, { useState, useEffect } from 'react'
// import './UnlimitedScroll.css'
import { Masonry } from "@mui/lab";

function UnlimitedScroll() {
  const [todos, setTodos] = useState([])
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const request = await fetch(`http://localhost:5000/todos?skip=${skip}`)
        const todosJson = await request.json()
        setTodos([...todos, ...todosJson])
      } catch (e) {

      }
    }

    fetchTodos()

  }, [skip])

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight} = e.target
       console.log(scrollTop)
    if (offsetHeight + scrollTop === scrollHeight) {
      setSkip(todos.length)
    }
  }

  return (
    <div className="todos-list" onScroll={handleScroll}>
        <Masonry columns={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8}} spacing={1}>
        {todos.map((todo) => {
            return <div className="todo" key={todo._id}>
            <p className="todo-title">{todo.title}</p>
            <p className="todo-description">{todo.description}</p>
            </div>
        })}
      </Masonry>
    </div>
  )
}

export default UnlimitedScroll