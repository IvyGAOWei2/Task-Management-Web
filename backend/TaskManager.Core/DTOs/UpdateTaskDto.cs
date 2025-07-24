using System;
using TaskManager.Core.Entities;

namespace TaskManager.Core.DTOs
{
    public class UpdateTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskStatus Status { get; set; }
        public int Priority { get; set; }
        public DateTime? DueDate { get; set; }
    }
}