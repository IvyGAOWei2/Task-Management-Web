using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Core.Entities;

namespace TaskManager.Core.Repositories
{
    public interface ITaskRepository
    {
        Task<TaskItem> AddTaskAsync(TaskItem task);
        Task<TaskItem> GetTaskByIdAsync(int id);
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
        Task UpdateTaskAsync(TaskItem task);
        Task DeleteTaskAsync(int id);
    }
} 