"use client";

import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "@/services/api";
import { TaskItem, PagedResult, TaskQueryParameters } from "@/types/task";
import TaskList from "@/components/TaskList";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

const TasksPage = () => {
  const [tasks, setTasks] = useState<PagedResult<TaskItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<TaskQueryParameters>({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks(queryParams);
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [queryParams]);

  const handlePageChange = (newPage: number) => {
    setQueryParams((prevParams) => ({ ...prevParams, page: newPage }));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      setQueryParams((prev) => ({ ...prev }));
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Task List</h1>
      {tasks && tasks.items.length > 0 ? (
        <>
          <TaskList tasks={tasks.items} onDelete={handleDelete} />
          {/* TODO: Add pagination controls */}
        </>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TasksPage;
