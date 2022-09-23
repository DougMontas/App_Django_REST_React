import "./App.css";
import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import TodoListPage from './pages/TodoListPage'
import ListItems from './components/ListItems'
import { GrList } from "react-icons/gr"
import CreateTodos from "./components/CreateTodos"



function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  // console.log(tasks);
  // console.log(input);
  const HOST = 'http://127.0.0.1:8003'

  let today = new Date();
  let todaysDate = today.toDateString();

  //add task
  let handleSubmit = (e) => {
    e.preventDefault();
        
    const addTask = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      completed: false,
    };
    setTasks([...tasks, addTask]);
    setInput("");
    createTask(addTask)
    

    // if(addTask === ''){
    //   e.preventDefault()
    // }
  };

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
    // let total = tasks.map(task => task.completed === false)
    // console.log('total', total.length)
    let totalCompleted = tasks.filter(task => task.completed === false)
    // console.log('totalCompleted', totalCompleted)

    return totalCompleted.length
  }

  //get tasks

  let getTodos = async () => {
    let response = await fetch(HOST + '/api/todos/')
    let data = await response.json()

    // console.log('DATA', data)
    
    setTasks(data)
} 


let createTask = async (task) => {
        fetch(HOST + '/api/todos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(task)
        })
        
    }

 

  return (
    
    <>
      <div className="App">
        <div className="container">
          <h1>
            <GrList /> Power todo List{" "}
          </h1>
          <p className="todays-date">{todaysDate}</p>
        </div>

        
          <form onSubmit={handleSubmit} className="form-wrapper">
          
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
              
              {/* <button type="button" className="btn btn-success">
              Submit
            </button> */}
            </div>
          </form>

              <TodoListPage />
          {/* <div>
          {tasks.map((task, index) => (
                <ListItems key={index} task={task} />
            ))}
            
          </div> */}

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
