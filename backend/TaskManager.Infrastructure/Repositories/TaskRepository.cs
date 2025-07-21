using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManager.Core.Entities;
using TaskManager.Core.Repositories;
using TaskManager.Core.DTOs;
using TaskManager.Infrastructure.Data;

namespace TaskManager.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskDbContext _context;

        public TaskRepository(TaskDbContext context)
        {
            _context = context;
        }

        public async Task<TaskItem> AddTaskAsync(TaskItem task)
        {
            task.CreatedAt = DateTime.UtcNow;
            task.UpdatedAt = DateTime.UtcNow;
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task DeleteTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<PagedResult<TaskItem>> GetTasksAsync(TaskQueryParameters parameters)
        {
            var query = _context.Tasks.AsQueryable();

            // 搜索功能
            if (!string.IsNullOrWhiteSpace(parameters.SearchTerm))
            {
                var searchTerm = parameters.SearchTerm.ToLower();
                query = query.Where(t => 
                    t.Title.ToLower().Contains(searchTerm) || 
                    (t.Description != null && t.Description.ToLower().Contains(searchTerm)));
            }

            // 状态过滤
            if (parameters.Status.HasValue)
            {
                query = query.Where(t => t.Status == parameters.Status.Value);
            }

            // 优先级过滤
            if (parameters.Priority.HasValue)
            {
                query = query.Where(t => t.Priority == parameters.Priority.Value);
            }

            // 排序
            query = parameters.SortBy?.ToLower() switch
            {
                "title" => parameters.SortDescending ? query.OrderByDescending(t => t.Title) : query.OrderBy(t => t.Title),
                "priority" => parameters.SortDescending ? query.OrderByDescending(t => t.Priority) : query.OrderBy(t => t.Priority),
                "duedate" => parameters.SortDescending ? query.OrderByDescending(t => t.DueDate) : query.OrderBy(t => t.DueDate),
                "status" => parameters.SortDescending ? query.OrderByDescending(t => t.Status) : query.OrderBy(t => t.Status),
                _ => parameters.SortDescending ? query.OrderByDescending(t => t.CreatedAt) : query.OrderBy(t => t.CreatedAt)
            };

            // 获取总数
            var totalCount = await query.CountAsync();

            // 分页
            var items = await query
                .Skip((parameters.Page - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .ToListAsync();

            // 计算分页信息
            var totalPages = (int)Math.Ceiling((double)totalCount / parameters.PageSize);

            return new PagedResult<TaskItem>
            {
                Items = items,
                TotalCount = totalCount,
                Page = parameters.Page,
                PageSize = parameters.PageSize,
                TotalPages = totalPages,
                HasNextPage = parameters.Page < totalPages,
                HasPreviousPage = parameters.Page > 1
            };
        }

        public async Task<TaskItem> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task UpdateTaskAsync(TaskItem task)
        {
            task.UpdatedAt = DateTime.UtcNow;
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }
    }
} 