import './TaskView.scss';

const TaskView = ({ task, onClose, onEdit }) => {
  if (!task) return null;

  const { title, description, priority, dueDate, completed } = task;

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
    if (!dateString) return 'Não definida';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
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
    <div className="task-view">
      <div className="task-view__header">
        <span className={`task-view__status ${completed ? 'task-view__status--completed' : ''}`}>
          {completed ? 'Concluída' : 'Pendente'}
        </span>
        {isOverdue() && <span className="task-view__overdue">Atrasada</span>}
      </div>

      <h2 className="task-view__title">{title}</h2>

      <div className="task-view__field">
        <span className="task-view__label">Descrição</span>
        <p className="task-view__description">
          {description || 'Sem descrição'}
        </p>
      </div>

      <div className="task-view__row">
        <div className="task-view__field">
          <span className="task-view__label">Prioridade</span>
          <span className={`task-view__priority task-view__priority--${priorityInfo.class}`}>
            {priorityInfo.label}
          </span>
        </div>

        <div className="task-view__field">
          <span className="task-view__label">Data de Entrega</span>
          <span className={`task-view__date ${isOverdue() ? 'task-view__date--overdue' : ''}`}>
            {formatDate(dueDate)}
          </span>
        </div>
      </div>

      <div className="task-view__actions">
        <button className="task-view__btn task-view__btn--secondary" onClick={onClose}>
          Fechar
        </button>
        <button className="task-view__btn task-view__btn--primary" onClick={() => onEdit(task)}>
          Editar
        </button>
      </div>
    </div>
  );
};

export default TaskView;
