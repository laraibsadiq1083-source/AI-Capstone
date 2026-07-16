function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span className="task-text">{task.text}</span>
      <div className="task-actions">
        <button
          type="button"
          className="btn-complete"
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem
