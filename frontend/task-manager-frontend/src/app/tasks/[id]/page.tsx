"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTask, updateTask } from "@/services/api";
import { TaskItem, TaskStatus } from "@/types/task";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";

const TaskDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [task, setTask] = useState<TaskItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await getTask(id);
        setTask(data);
      } catch (err) {
        setError("Failed to load task.");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!task) return <p>Task not found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
        {task.title}
      </h1>
      <div className="mb-4 flex flex-wrap gap-6">
        <div>
          <span className="font-semibold text-gray-500">Status: </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold ${
              task.status === TaskStatus.Completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {TaskStatus[task.status]}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-500">Priority: </span>
          <span className="font-bold text-indigo-700">{task.priority}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-500">Due Date: </span>
          <span className="font-medium text-gray-800">
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-500">Created At: </span>
        <span className="text-gray-700">
          {new Date(task.createdAt).toLocaleString()}
        </span>
      </div>
      {task.updatedAt && (
        <div className="mb-2">
          <span className="font-semibold text-gray-500">Updated At: </span>
          <span className="text-gray-700">
            {new Date(task.updatedAt).toLocaleString()}
          </span>
        </div>
      )}
      <div className="mb-6">
        <span className="font-semibold text-gray-500">Description: </span>
        <p className="mt-1 text-gray-900 whitespace-pre-line">
          {task.description || "No description."}
        </p>
      </div>
      <div className="flex gap-4 mt-8">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
        >
          Edit
        </Link>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TaskDetailPage;
