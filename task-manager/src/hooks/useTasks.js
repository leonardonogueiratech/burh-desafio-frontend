import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique sua conexão ou API ID.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task) => {
    try {
      setError(null);
      const newTask = await taskService.create(task);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError('Erro ao criar tarefa.');
      throw err;
    }
  };

  const updateTask = async (id, task) => {
    try {
      setError(null);
      const updatedTask = await taskService.update(id, task);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? updatedTask : t))
      );
      return updatedTask;
    } catch (err) {
      setError('Erro ao atualizar tarefa.');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      setError(null);
      await taskService.delete(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError('Erro ao deletar tarefa.');
      throw err;
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      await updateTask(id, { ...task, completed: !task.completed });
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refreshTasks: fetchTasks,
  };
};
