import './TaskItem.scss';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const { _id, title, description, priority, dueDate, completed } = task;

  const getPriorityInfo = (priority) => {
    const info = {
      1: { label: 'Muito Baixa', class: 'very-low' },
      2: { label: 'Baixa', class: 'low' },
      3: { label: 'Média', class: 'medium' },
      4: { label: 'Alta', class: 'high' },
      5: { label: 'Urgente', class: 'urgent' },
    };
    return info[priority] || info[3];
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const isOverdue = () => {
    if (!dueDate || completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate + 'T00:00:00');
    return due < today;
  };

  const priorityInfo = getPriorityInfo(priority);

  return (
    <article
      className={`task-item ${completed ? 'task-item--completed' : ''} ${
        isOverdue() ? 'task-item--overdue' : ''
      }`}
    >
      <div className="task-item__checkbox-wrapper">
        <label className="task-item__checkbox-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleComplete(_id)}
            className="task-item__checkbox"
            aria-label={completed ? 'Marcar como pendente' : 'Marcar como concluída'}
          />
          <span className="task-item__checkbox-custom">
            {completed && (
              <svg viewBox="0 0 24 24" className="task-item__check-icon">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}
          </span>
        </label>
      </div>

      <div className="task-item__content">
        <div className="task-item__header">
          <h3 className="task-item__title">{title}</h3>
          <span className={`task-item__priority task-item__priority--${priorityInfo.class}`}>
            {priorityInfo.label}
          </span>
        </div>

        {description && <p className="task-item__description">{description}</p>}

        <div className="task-item__meta">
          {dueDate && (
            <span className={`task-item__date ${isOverdue() ? 'task-item__date--overdue' : ''}`}>
              <svg viewBox="0 0 24 24" className="task-item__date-icon">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
              </svg>
              {formatDate(dueDate)}
              {isOverdue() && <span className="task-item__overdue-badge">Atrasada</span>}
            </span>
          )}
        </div>
      </div>

      <div className="task-item__actions">
        <button
          onClick={() => onEdit(task)}
          className="task-item__action task-item__action--edit"
          aria-label="Editar tarefa"
          title="Editar"
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="task-item__action task-item__action--delete"
          aria-label="Excluir tarefa"
          title="Excluir"
        >
          <svg viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default TaskItem;
