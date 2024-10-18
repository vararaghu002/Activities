import React, { useState } from "react";
import { useTaskContext } from "../GlobalState.jsx";
import { TaskInput, Button } from "../styles.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

const TaskForm = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState(null); 
  const { addTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() && dueDate) {
      addTask({ title: task, priority, dueDate });
      setTask("");
      setPriority("Low");
      setDueDate(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TaskInput
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <select style={{margin:'10px',height:'21px'}} value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <DatePicker 
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText="Select a due date"
        className="date-picker" 
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;
