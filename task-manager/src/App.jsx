import { useState } from 'react'
import AddTaskForm from './components/AddTaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [nextId, setNextId] = useState(1)

  const handleAddTask = (text) => {
    setTasks((prevTasks) => [...prevTasks, { id: nextId, text, completed: false }])
    setNextId((id) => id + 1)
  }

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="app-subtitle">Stay organized and get things done</p>
      </header>

      <main className="app-main">
        <AddTaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  )
}

export default App
