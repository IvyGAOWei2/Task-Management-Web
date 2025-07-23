'use client';
import TaskForm from '@/components/TaskForm';
import { useRouter } from 'next/navigation';

const NewTaskPage = () => {
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <TaskForm onSuccess={() => router.push('/tasks')} />
    </div>
  );
};

export default NewTaskPage;
