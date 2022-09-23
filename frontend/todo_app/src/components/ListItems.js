import React from 'react'

const ListItems = ({task}) => {
  return (
    <div>
        <h3>{task.tasks}</h3>
        {/* {console.log(task.tasks, 'THIS IS TASK.TASKS')} */}
    </div>
  )
}

export default ListItems