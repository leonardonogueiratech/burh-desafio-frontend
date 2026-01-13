import TaskItem from '../TaskItem';
import './TaskList.scss';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete, loading, error }) => {
  if (loading) {
    return (
      <div className="task-list task-list--loading">
        <div className="task-list__loader">
          <div className="task-list__spinner"></div>
          <p>Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list task-list--error">
        <div className="task-list__error-content">
          <svg viewBox="0 0 24 24" className="task-list__error-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <p>{error}</p>
          <p className="task-list__error-hint">
            Verifique se o API ID está configurado corretamente em{' '}
            <code>src/services/api.js</code>
          </p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list task-list--empty">
        <div className="task-list__empty-content">
          <svg viewBox="0 0 24 24" className="task-list__empty-icon">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <h3>Nenhuma tarefa encontrada</h3>
          <p>Crie sua primeira tarefa usando o formulário acima!</p>
        </div>
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.priority !== b.priority) return b.priority - a.priority;
    if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
    return a.dueDate ? -1 : 1;
  });

  return (
    <section className="task-list">
      <h2 className="task-list__title">
        Suas Tarefas
        <span className="task-list__count">{tasks.length}</span>
      </h2>
      <div className="task-list__items">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </section>
  );
};

export default TaskList;
