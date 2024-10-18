import React, { createContext, useContext, useState } from "react";


const TaskContext = createContext();

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const addTask = ({ title, priority, dueDate }) => {
    setTasks([...tasks, { id: Date.now(), title, priority, dueDate, completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = () => {
    let filtered = tasks;


    if (filter === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (filter === "pending") {
      filtered = filtered.filter((task) => !task.completed);
    }


    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }
    return filtered;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        setFilter,
        filteredTasks,
        filter,
        setPriorityFilter,
        priorityFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
