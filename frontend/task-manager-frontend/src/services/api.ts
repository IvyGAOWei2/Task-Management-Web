import { PagedResult, TaskItem, TaskQueryParameters } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5245/api';

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
  console.log('updateTask called with:', { id, task });
  
  const response = await fetch(`${API_BASE_URL}/task/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
  
  if (!response.ok) {
    let errorMessage = 'Failed to update task';
    try {
      const errorData = await response.text();
      console.log('Error response body:', errorData);
      errorMessage += `: ${errorData}`;
    } catch (e) {
      console.log('Could not parse error response');
    }
    throw new Error(errorMessage);
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