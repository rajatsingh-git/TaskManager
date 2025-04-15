import React, { useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import Header from '../others/Header';
import AllTask from '../others/AllTask';

const AdminDashboard = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [category, setCategory] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleCreateTask = () => {
    if (!taskTitle || !taskDate || !assignedTo || !category || !taskDescription) {
      alert('Please fill in all fields');
      return;
    }

    // Find the employee to assign the task
    const updatedEmployees = userData.employees.map((emp) => {
      if (emp.Username === assignedTo) {
        return {
          ...emp,
          tasks: [
            ...emp.tasks,
            {
              taskTitle,
              taskDate,
              category,
              taskDescription,
              status: 'new',
            },
          ],
        };
      }
      return emp;
    });

    // Update userData state and localStorage
    const updatedUserData = { ...userData, employees: updatedEmployees };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    // Show alert after task is created
    alert('Task successfully assigned to ' + assignedTo);

    // Reset input fields
    setTaskTitle('');
    setTaskDate('');
    setAssignedTo('');
    setCategory('');
    setTaskDescription('');
  };

  return (
    <>
      <div className="empDashboard">
        {/* <Header /> */}
        <div className="adminDashBoardform">
          <div className="adminDashboardMain">
            {/* Left Side: Task Inputs */}
            <div className="adminDashboardInputs">
              <span className="adminDashboardMainTitle">Task Title</span>
              <div className="adminDashboardMainContent">
                <input className="inputdesign" type="text" placeholder="Enter Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
              </div>

              <span className="adminDashboardMainTitle">Date</span>
              <div className="adminDashboardMainContent">
                <input className="inputdesign" type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
              </div>

              <span className="adminDashboardMainTitle">Assign to</span>
              <div className="adminDashboardMainContent">
                <input className="inputdesign" type="text" placeholder="Enter Employee Username" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
              </div>

              <span className="adminDashboardMainTitle">Category</span>
              <div className="adminDashboardMainContent">
                <input className="inputdesign" type="text" placeholder="Design, Dev, etc." value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
            </div>

            {/* Right Side: Task Description */}
            <div className="adminDashboardDescriptionContainer">
              <span className="adminDashboardMainTitle">Task Description</span>
              <textarea className="inputdesignDescription" placeholder="Enter Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
              <button className="adminDashboardAddTaskButton" onClick={handleCreateTask}>Create Task</button>
            </div>
          </div>
        </div>
      </div>
      <AllTask tasks={userData.employees.flatMap(emp => emp.tasks)} />
    </>
  );
};

export default AdminDashboard;