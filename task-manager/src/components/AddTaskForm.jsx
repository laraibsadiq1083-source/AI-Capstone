function AddTaskForm({ onAddTask }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const taskText = formData.get('taskText').trim()

    if (taskText) {
      onAddTask(taskText)
      event.target.reset()
    }
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-input" className="visually-hidden">
        New task
      </label>
      <input
        id="task-input"
        name="taskText"
        type="text"
        placeholder="Add a new task..."
        autoComplete="off"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default AddTaskForm
