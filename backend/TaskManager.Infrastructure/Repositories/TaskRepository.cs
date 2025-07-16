using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Core.Entities;
using TaskManager.Core.Repositories;

namespace TaskManager.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        public Task<TaskItem> AddTaskAsync(TaskItem task)
        {
            throw new NotImplementedException();
        }

        public Task DeleteTaskAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            throw new NotImplementedException();
        }

        public Task<TaskItem> GetTaskByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateTaskAsync(TaskItem task)
        {
            throw new NotImplementedException();
        }
    }
} 