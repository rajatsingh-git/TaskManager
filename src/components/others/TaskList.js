import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';

const TaskList = () => {
  const { userData } = useContext(AuthContext);
  const [taskCounts, setTaskCounts] = useState({
    newTask: 0,
    active: 0,
    complete: 0,
    failed: 0,
  });

  useEffect(() => {
    if (userData?.currentUser === 'employee') {
      const loggedInEmployee = userData.employees.find(
        (emp) => emp.Username === userData.username
      );

      if (loggedInEmployee) {
        const tasks = loggedInEmployee.tasks || [];
        setTaskCounts({
          newTask: tasks.filter((task) => task.status === 'new').length,
          active: tasks.filter((task) => task.status === 'active').length,
          complete: loggedInEmployee.completedTasks || 0,
          failed: loggedInEmployee.failedTasks || 0,
        });
      }
    }
  }, [userData]);

  return (
    <div className="tasklistContainer">
      <span className="tasklistHeader1">
        <div className="task1">
          <h2>{taskCounts.newTask}<br/><h5>New Tasks</h5></h2>
        </div>
      </span>
      <span className="tasklistHeader2">
        <h2>{taskCounts.active}<br/><h5>Active Tasks</h5></h2>
      </span>
      <span className="tasklistHeader3">
        <h2>{taskCounts.complete}<br/><h5>Completed Tasks</h5></h2>
      </span>
      <span className="tasklistHeader4">
        <h2>{taskCounts.failed}<br/><h5>Failed Tasks</h5></h2>
      </span>
    </div>
  );
};

export default TaskList;
