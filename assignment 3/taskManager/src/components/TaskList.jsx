// src/components/TaskList.js
import React from "react";
import { useTaskContext } from "../GlobalState.jsx";
import TaskItemComponent from "./TaskItem.jsx";
import { TaskList } from "../styles.jsx";
import '../index.css';

const TaskListComponent = () => {
  const { filteredTasks, setPriorityFilter, priorityFilter } = useTaskContext();
  const tasks = filteredTasks();

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  return (
    <>
      <div>
        <label className="label-priority" style={{fontSize:'16px',marginRight:'5px',fontWeight:"bold"}}>Filter by Priority:</label>
        <select className="select-priority" value={priorityFilter} onChange={handlePriorityChange}>
          <option value="all">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <TaskList>
        {tasks.length ? (
          tasks.map((task) => <TaskItemComponent key={task.id} task={task} />)
        ) : (
          <p>No tasks available</p>
        )}
      </TaskList>
    </>
  );
};

export default TaskListComponent;
