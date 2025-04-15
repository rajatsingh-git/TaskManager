import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import Complete from './Complete';
import FailedTask from './FailedTask';

const TaskListComponent = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
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
        setTasks(tasks);
        setTaskCounts({
          newTask: tasks.filter((task) => task.status === 'new').length,
          active: tasks.filter((task) => task.status === 'active').length,
          complete: loggedInEmployee.completedTasks || 0,
          failed: loggedInEmployee.failedTasks || 0,
        });
      }
    }
  }, [userData]);

  const updateUserData = (updatedTasks, updatedCounts) => {
    const updatedUserData = {
      ...userData,
      employees: userData.employees.map((emp) =>
        emp.Username === userData.username
          ? { ...emp, tasks: updatedTasks, completedTasks: updatedCounts.complete, failedTasks: updatedCounts.failed }
          : emp
      ),
    };

    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  // ✅ Handle task completion
  const handleTaskComplete = (taskIndex) => {
    const completedTask = tasks[taskIndex];
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);

    setTasks(updatedTasks);
    setTaskCounts((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        complete: prevCounts.complete + 1,
        newTask: completedTask.status === 'new' ? prevCounts.newTask - 1 : prevCounts.newTask,
        active: completedTask.status === 'active' ? prevCounts.active - 1 : prevCounts.active,
      };
      updateUserData(updatedTasks, updatedCounts);
      return updatedCounts;
    });
  };

  // ✅ Handle task failure
  const handleTaskFailed = (taskIndex) => {
    const failedTask = tasks[taskIndex];
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);

    setTasks(updatedTasks);
    setTaskCounts((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        failed: prevCounts.failed + 1,
        newTask: failedTask.status === 'new' ? prevCounts.newTask - 1 : prevCounts.newTask,
        active: failedTask.status === 'active' ? prevCounts.active - 1 : prevCounts.active,
      };
      updateUserData(updatedTasks, updatedCounts);
      return updatedCounts;
    });
  };

  return (
    <div className="taskListContainer">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index} className={`taskHeader${index + 1}`}>
            <div>
              <span className="taskupdate">{task.category}</span>
              <span className="date">{task.taskDate}</span>
            </div>
            <div className="details4">
              <h4>{task.taskTitle}</h4>
              <p>{task.taskDescription}</p>
              <div>
                <Complete onComplete={() => handleTaskComplete(index)} />
                <FailedTask onFailed={() => handleTaskFailed(index)} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="taskP">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskListComponent;