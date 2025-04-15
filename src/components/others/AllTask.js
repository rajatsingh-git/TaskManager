import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';

const AllTask = () => {
  const { userData } = useContext(AuthContext);
  
  return (
    <div className="taskDashboard">
      <div className='alltaskbox'>
        <table className="taskTable">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>New Tasks</th>
              <th>Active Tasks</th>
              <th>Completed</th>
              <th>Failed</th>
            </tr>
          </thead>
          <tbody>
            {userData.employees.map((emp, index) => {
              const newTasks = emp.tasks?.filter(task => task.status === 'new').length || 0;
              const activeTasks = emp.tasks?.filter(task => task.status === 'active').length || 0;
              const completedTasks = emp.completedTasks || 0;
              const failedTasks = emp.failedTasks || 0;
              
              return (
                <tr key={index}>
                  <td>{emp.Username}</td>
                  <td>{newTasks}</td>
                  <td>{activeTasks}</td>
                  <td>{completedTasks}</td>
                  <td>{failedTasks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTask;
