import React, {useState, useEffect} from 'react'
import ListItems from '../components/ListItems'

const TodoListPage = () => {

    let [tasks, setTasks] = useState([{}])
    const HOST = 'https://8000-dougmontas-appdjangores-3xebnjwwx58.ws-us67.gitpod.io'
    // const HOST = 'http://127.0.0.1:8000/'

useEffect(() => {
    getTodos()
},[])

let getTodos = async () => {
    let response = await fetch(HOST + '/api/todos/')
    let data = await response.json()

    console.log('DATA', data)
    
    setTasks(data)
} 
console.log('tasks',tasks)

// let createTask = async () => {
//     fetch('/api/todos/create', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': 'no-cors'
//         },
//         tasks: JSON.stringify(tasks)
//     })

// }


  return (
    <>
    <div>
        <div className="task">
            {tasks.map((task, index) => (
                <ListItems key={index} task={task} />
            ))}
        </div>
    </div>

    </>
    
  )
}

export default TodoListPage