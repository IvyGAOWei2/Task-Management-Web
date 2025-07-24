'use client';
import { useState, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import { useRouter, useParams } from 'next/navigation';
import { TaskItem } from '@/types/task';
import { getTask, updateTask } from '@/services/api';

const EditTaskPage = () => {
  const router = useRouter();
  const params = useParams();
  const taskIdString = params.id as string;
  const taskId = parseInt(taskIdString, 10); // 明确转换为 number
  
  console.log('Route params:', params);
  console.log('TaskId string:', taskIdString);
  console.log('TaskId number:', taskId);
  
  const [task, setTask] = useState<TaskItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        
        if (!taskIdString || isNaN(taskId)) {
          throw new Error('Invalid task ID');
        }
        
        console.log('Fetching task with ID:', taskId);
        const fetchedTask = await getTask(taskId);
        console.log('Fetched task:', fetchedTask);
        setTask(fetchedTask);
      } catch (err) {
        console.error('Failed to fetch task:', err);
        setError(`Failed to load task: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, taskIdString]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="text-center text-red-600">
          {error || 'Task not found.'}
        </div>
      </div>
    );
  }

  // 自定义的更新函数
  const handleUpdateTask = async (updatedData: Omit<TaskItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!task) return;
    
    console.log('Original task:', task);
    console.log('Updated data:', updatedData);
    console.log('TaskId for update:', taskId);
    
    // 合并现有任务数据和更新数据
    const updatedTask: TaskItem = {
      ...task, // 保留 id, createdAt, updatedAt
      ...updatedData, // 覆盖其他字段
    };
    
    // 清理 dueDate - 如果为空字符串则设为 null 或 undefined
    if (updatedTask.dueDate === '') {
      updatedTask.dueDate = undefined;
    }
    
    console.log('Final task to update:', updatedTask);
    console.log('API URL will be:', `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5245/api'}/task/${taskId}`);
    
    try {
      await updateTask(taskId, updatedTask);
      console.log('Update successful');
    } catch (error) {
      console.error('Update failed:', error);
      throw error; // 重新抛出错误以便UI处理
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      <TaskForm 
        initialValues={task}
        isEdit={true}
        onSubmit={handleUpdateTask}
        onSuccess={() => router.push('/tasks')} 
      />
    </div>
  );
};

export default EditTaskPage;