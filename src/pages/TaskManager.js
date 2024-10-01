import React, { useState } from "react";
import "./TaskManager.css";

const sampleTasks = [
  { name: "Follow up with John Doe", completed: false },
  { name: "Send email campaign to lead group A", completed: true },
  { name: "Schedule a demo with Jane Smith", completed: false },
];

const TaskManager = () => {
  const [tasks, setTasks] = useState(sampleTasks);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    const newTask = {
      name: taskInput,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="task-manager">
      <h2>Automated Task Manager</h2>
      <input
        type="text"
        placeholder="New Task..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            {task.name}
            <button onClick={() => toggleTaskCompletion(index)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
