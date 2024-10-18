import { useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm.jsx';
import { TaskProvider } from './GlobalState.jsx';
import TaskFilter from "./components/TaskFilter.jsx";
import TaskListComponent from "./components/TaskList.jsx";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="task-container">
    <TaskProvider>
     <h1>Task Manager</h1>
      <TaskForm />
      <TaskFilter/>
      <TaskListComponent />
      </TaskProvider>
    </div>
  )
}

export default App;
