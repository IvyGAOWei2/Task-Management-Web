import { PagedResult, TaskItem, TaskQueryParameters } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7213/api';

export const getTasks = async (params: TaskQueryParameters): Promise<PagedResult<TaskItem>> => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_BASE_URL}/task/paged?${query.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
};

export const getTask = async (id: number): Promise<TaskItem> => {
  const response = await fetch(`${API_BASE_URL}/task/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }

  return response.json();
};

export const createTask = async (task: Omit<TaskItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<TaskItem> => {
  const response = await fetch(`${API_BASE_URL}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
};

export const updateTask = async (id: number, task: TaskItem): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/task/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/task/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}; 