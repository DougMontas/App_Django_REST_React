import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header"


function App() {
  const [tasks, setTasks] = useState([{}]);
  const [input, setInput] = useState("");
  


  const HOST = 'https://8000-dougmontas-appdjangores-3xebnjwwx58.ws-us69.gitpod.io'

  //add task
  let handleSubmit = (e) => {
    e.preventDefault();

    const addTask = {
      text: input,
      completed: false,
    };
    setTasks([...tasks, addTask]);
    setInput("");
    getTodos({})
    createTask(addTask)
  };

  //get tasks
  let getTodos = async () => {
    let response = await fetch(`${HOST}/api/todos/`)
    let data = await response.json()

    setTasks(data)
  }

  //delete task
  let deleteTodo = async (id) => {
    let response = await fetch(`${HOST}/api/todos/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },

    },)
    let data = await response.json()
    setTasks(data);
  };

  //toggle completed task
  let toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //total tasks left
  let totalTasks = () => {
    let totalCompleted = tasks.filter(task => task.completed === false)
    return totalCompleted.length
  }

  //post tasks
  let createTask = async (task) => {
    let response = await fetch(`${HOST}/api/todos/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),

    },)

    // return response
    let data = await response.json()
    setTasks(data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (

    <>
      <div>

        <Header />

        <form onSubmit={handleSubmit} className="form-wrapper" action="create" method="POST">

          <div className="form-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter tasks"
              type="text"
            />
            <div>


            </div>
            <div className="pending-task">
              {`You have ${totalTasks()} tasks to do!`}
            </div>
          </div>
        </form>
        <div>
          {tasks.map((task) => (
            <div
              className={`task-row ${task.completed ? 'completed' : ''}`}
              key={task.id}
              onDoubleClick={() => toggleComplete(task.id)}
            >
              <h5>
                {task.tasks}{" "}
                <button
                  onClick={() => deleteTodo(task.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  X
                </button>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </>

  );
}


export default App;
