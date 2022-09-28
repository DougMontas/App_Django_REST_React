import "./App.css";
import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import TodoListPage from './pages/TodoListPage'
import ListItems from './components/ListItems'
// import { GrList } from "react-icons/gr"
import CreateTodos from "./components/CreateTodos"
import Header from "./components/Header"


function App() {
  const [tasks, setTasks] = useState([{'something': 'anything'}]);
  const [input, setInput] = useState("");
  // console.log(tasks);
  // console.log(input);

  // const HOST = 'http://127.0.0.1:8000'
  const HOST = 'https://8000-dougmontas-appdjangores-3xebnjwwx58.ws-us68.gitpod.io'

  //add task
  let handleSubmit = (e) => {
    e.preventDefault();

    const addTask = {
      // id: Math.floor(Math.random() * 1000),
      text: input,
      completed: false,
    };
    setTasks([...tasks, addTask]);
    setInput("");
    createTask(addTask)
   
  };

  //get tasks
  let getTodos = async () => {
    let response = await fetch(`${HOST}/api/todos/`)
    let data = await response.json()

    console.log('DATA', data)
    setTasks(data)
  }

  //delete task
  let deleteTask = (id) => {
    let filteredTasks = [...tasks].filter((tasks) => tasks.id !== id);
    setTasks(filteredTasks);
    console.log("task has been completed");
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
        // 'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(task),
      
    },)
     return response
     
  }




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

        {/* <TodoListPage /> */}
       


        <div>
          {tasks.map((task) => (
            <div
              className={`task-row ${task.completed ? 'completed' : ''}`}
              key={task.id}
              onDoubleClick={() => toggleComplete(task.id)}
            >
              <h5>
                {task.text}{" "}


                {/* {getTodos()} */}

                <button
                  onClick={() => deleteTask(task.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  X
                </button>
              </h5>
            </div>
          ))}
        </div>



        {/* <Route path='/' exact component={TodoListPage} /> */}

      </div>
    </>

  );
}

export default App;
