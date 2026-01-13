import { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import { useTasks } from './hooks/useTasks';
import './styles/global.scss';
import './App.scss';

function App() {
  const { tasks, loading, error, addTask, updateTask, deleteTask, toggleComplete } =
    useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const completedCount = tasks.filter((task) => task.completed).length;

  const handleAddTask = async (taskData) => {
    await addTask(taskData);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (taskData) => {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
      setEditingTask(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      await deleteTask(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <Header taskCount={tasks.length} completedCount={completedCount} />

      <main className="app__main">
        <div className="container">
          <section className="app__form-section">
            <TaskForm onSubmit={handleAddTask} />
          </section>

          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={toggleComplete}
          />
        </div>
      </main>

      <footer className="app__footer">
        <div className="container">
          <p>
            Desenvolvido com <span className="app__heart">&#9829;</span> para o desafio BURH
          </p>
        </div>
      </footer>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TaskForm
          onSubmit={handleUpdateTask}
          initialData={editingTask}
          onCancel={handleCloseModal}
          isEditing
        />
      </Modal>

      {deleteConfirm && (
        <div className="app__confirm-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="app__confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="app__confirm-icon">
              <svg viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </div>
            <h3>Excluir Tarefa</h3>
            <p>Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.</p>
            <div className="app__confirm-actions">
              <button
                className="app__confirm-btn app__confirm-btn--cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancelar
              </button>
              <button
                className="app__confirm-btn app__confirm-btn--delete"
                onClick={confirmDelete}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
