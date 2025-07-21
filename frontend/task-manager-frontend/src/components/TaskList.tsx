import { TaskItem, TaskStatus } from '@/types/task';
import Link from 'next/link';

const getStatusClass = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Pending:
      return 'bg-yellow-200 text-yellow-800';
    case TaskStatus.InProgress:
      return 'bg-blue-200 text-blue-800';
    case TaskStatus.Completed:
      return 'bg-green-200 text-green-800';
    case TaskStatus.Cancelled:
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const getPriorityText = (priority: number) => {
  switch (priority) {
    case 1: return 'Very High';
    case 2: return 'High';
    case 3: return 'Medium';
    case 4: return 'Low';
    case 5: return 'Very Low';
    default: return 'Unknown';
  }
};

interface TaskListProps {
  tasks: TaskItem[];
}

const TaskList = ({ tasks }: TaskListProps) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tasks.map((task) => (
          <tr key={task.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <Link href={`/tasks/${task.id}`} className="text-blue-600 hover:underline">
                {task.title}
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(task.status)}`}>
                {TaskStatus[task.status]}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{getPriorityText(task.priority)}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Link href={`/tasks/${task.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                Edit
              </Link>
              {/* TODO: Add delete functionality */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TaskList; 