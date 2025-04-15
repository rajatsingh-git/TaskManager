import React from 'react'
import Header from '../others/Header'
import TaskList from '../others/TaskList'
import TaskListComponent from '../TaskList/TaskListComponent'

const EmployeeDashboard = () => {
  return (
    <div className='empDashboard'>
      {/* < Header /> */}
      <TaskList />
      <TaskListComponent />

    </div>
  )
}

export default EmployeeDashboard
