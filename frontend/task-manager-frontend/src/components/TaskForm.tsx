
import React, { useState } from 'react';
import { TaskItem, TaskStatus } from '@/types/task';
import { createTask } from '@/services/api';
import { useRouter } from 'next/navigation';
import ErrorMessage from './ErrorMessage';

interface TaskFormProps {
  onSuccess?: (task: TaskItem) => void;
}

const defaultForm = {
  title: '',
  description: '',
  status: TaskStatus.Pending,
  priority: 3,
  dueDate: '',
};

const TaskForm: React.FC<TaskFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return 'Title is required.';
    if (form.priority < 1 || form.priority > 5) return 'Priority must be between 1 and 5.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        priority: Number(form.priority),
        status: Number(form.status),
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
      };
      const task = await createTask(payload as any);
      if (onSuccess) onSuccess(task);
      else router.push(`/tasks/${task.id}`);
    } catch (err) {
      setError('Failed to create task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}
      <div>
        <label className="block font-medium mb-1">Title<span className="text-red-500">*</span></label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          rows={3}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {Object.entries(TaskStatus)
              .filter(([k, v]) => !isNaN(Number(v)))
              .map(([k, v]) => (
                <option key={v} value={v}>{k}</option>
              ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1">Priority (1-5)</label>
          <input
            type="number"
            name="priority"
            value={form.priority}
            min={1}
            max={5}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
