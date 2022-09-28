import React from 'react'

const CreateTodos = () => {

    let createTask = async () => {
        fetch('/api/todos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify()
        })
        
    }
  return (
    <div>CreateTodos</div>
  )
}

export default CreateTodos