import React from "react";
import { useTaskContext } from "../GlobalState";
import { TaskItem, Button } from "../styles";

const TaskItemComponent = ({ task }) => {
  const { deleteTask, toggleTaskCompletion } = useTaskContext();

  const handleCheckboxChange = () => {
    toggleTaskCompletion(task.id);
  };

  return (
    <TaskItem completed={task.completed}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
          style={{ marginRight: "10px", cursor: "pointer" }}
        />
        <span>{task.title}</span>
        <strong style={{ marginLeft: "10px", color: "gray" }}>
          ({task.priority} priority)
        </strong>
        {task.dueDate && (
          <span style={{ marginLeft: "10px", color: "blue" }}>
            (Due: {new Date(task.dueDate).toLocaleDateString()})
          </span>
        )}
      </div>
      <div>
        <Button onClick={() => deleteTask(task.id)}>Delete</Button>
      </div>
    </TaskItem>
  );
};

export default TaskItemComponent;
