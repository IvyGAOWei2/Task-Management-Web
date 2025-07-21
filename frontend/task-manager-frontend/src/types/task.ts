export enum TaskStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
  Cancelled = 3,
}

export interface TaskItem {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: number;
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TaskQueryParameters {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  status?: TaskStatus;
  priority?: number;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} 