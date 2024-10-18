import React from "react";
import { useTaskContext } from "../GlobalState.jsx";
import { Button } from "../styles.jsx";

const TaskFilter = () => {
  const { setFilter, filter } = useTaskContext();

  return (
    <div>
      <Button
        onClick={() => setFilter("all")}
        style={{ marginBottom:'15px',backgroundColor: filter === "all" ? "#00008B" : "#007bff" }}
      >
        All
      </Button>
      <Button
        onClick={() => setFilter("completed")}
        style={{ backgroundColor: filter === "completed" ? "#00008B" : "#007bff" }}
      >
      Completed
      </Button>
      <Button
        onClick={() => setFilter("pending")}
        style={{ backgroundColor: filter === "pending" ? "#00008B" : "#007bff" }}
      >
      Pending
      </Button>
    </div>
  );
};

export default TaskFilter;
