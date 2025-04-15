const employees = [
  {
    ID: 1,
    Username: "employee1",
    Password: "123",
    tasks: [
      { active: true, newTask: false, complete: false, failed: false, taskTitle: "Design Homepage", taskDescription: "Create a responsive homepage layout.", taskDate: "2025-03-07", category: "Design" },
      { active: false, newTask: true, complete: false, failed: false, taskTitle: "Fix Navbar Bug", taskDescription: "Resolve navigation bar responsiveness issue.", taskDate: "2025-03-08", category: "Development" }
    ]
  },
  {
    ID: 2,
    Username: "employee2",
    Password: "123",
    tasks: [
      { active: true, newTask: false, complete: false, failed: false, taskTitle: "Develop API", taskDescription: "Build an API endpoint for user authentication.", taskDate: "2025-03-09", category: "Backend" },
      { active: false, newTask: false, complete: true, failed: false, taskTitle: "Optimize Database", taskDescription: "Improve database indexing for faster queries.", taskDate: "2025-03-10", category: "Database" }
    ]
  }
];

const admin = [
  {
    ID: 100,
    Username: "admin",
    Password: "123"
  }
];

export const setLocalStorage = () => {
  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify(employees));
  }
  if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify(admin));
  }
};

export const getLocalStorage = () => {
  return {
    employees: JSON.parse(localStorage.getItem('employees')) || [],
    admin: JSON.parse(localStorage.getItem('admin')) || []
  };
};
