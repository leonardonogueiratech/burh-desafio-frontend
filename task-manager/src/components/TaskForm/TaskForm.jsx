import { useState, useEffect } from 'react';
import './TaskForm.scss';

const TaskForm = ({ onSubmit, initialData, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 1,
    dueDate: '',
    completed: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 1,
        dueDate: initialData.dueDate || '',
        completed: initialData.completed || false,
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'O título deve ter pelo menos 3 caracteres';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'O título deve ter no máximo 100 caracteres';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'A descrição deve ter no máximo 500 caracteres';
    }

    if (formData.priority < 1 || formData.priority > 5) {
      newErrors.priority = 'A prioridade deve ser entre 1 e 5';
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today && !isEditing) {
        newErrors.dueDate = 'A data não pode ser anterior a hoje';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));

    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (!isEditing) {
        setFormData({
          title: '',
          description: '',
          priority: 1,
          dueDate: '',
          completed: false,
        });
      }
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      1: 'Muito Baixa',
      2: 'Baixa',
      3: 'Média',
      4: 'Alta',
      5: 'Urgente',
    };
    return labels[priority] || 'Média';
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="task-form__title">
        {isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
      </h2>

      <div className="task-form__group">
        <label htmlFor="title" className="task-form__label">
          Título <span className="task-form__required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`task-form__input ${errors.title ? 'task-form__input--error' : ''}`}
          placeholder="Digite o título da tarefa"
          maxLength={100}
        />
        {errors.title && <span className="task-form__error">{errors.title}</span>}
      </div>

      <div className="task-form__group">
        <label htmlFor="description" className="task-form__label">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`task-form__textarea ${errors.description ? 'task-form__textarea--error' : ''}`}
          placeholder="Descreva os detalhes da tarefa"
          rows={3}
          maxLength={500}
        />
        <span className="task-form__char-count">
          {formData.description.length}/500
        </span>
        {errors.description && <span className="task-form__error">{errors.description}</span>}
      </div>

      <div className="task-form__row">
        <div className="task-form__group task-form__group--half">
          <label htmlFor="priority" className="task-form__label">
            Prioridade
          </label>
          <div className="task-form__priority-wrapper">
            <input
              type="range"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              min={1}
              max={5}
              className="task-form__range"
            />
            <span className={`task-form__priority-label task-form__priority-label--${formData.priority}`}>
              {getPriorityLabel(formData.priority)}
            </span>
          </div>
          {errors.priority && <span className="task-form__error">{errors.priority}</span>}
        </div>

        <div className="task-form__group task-form__group--half">
          <label htmlFor="dueDate" className="task-form__label">
            Data de Entrega
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`task-form__input ${errors.dueDate ? 'task-form__input--error' : ''}`}
          />
          {errors.dueDate && <span className="task-form__error">{errors.dueDate}</span>}
        </div>
      </div>

      {isEditing && (
        <div className="task-form__group task-form__group--checkbox">
          <label className="task-form__checkbox-label">
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
              className="task-form__checkbox"
            />
            <span className="task-form__checkbox-custom"></span>
            Tarefa concluída
          </label>
        </div>
      )}

      <div className="task-form__actions">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="task-form__button task-form__button--cancel"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="task-form__button task-form__button--submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="task-form__loading"></span>
          ) : isEditing ? (
            'Salvar Alterações'
          ) : (
            'Criar Tarefa'
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
