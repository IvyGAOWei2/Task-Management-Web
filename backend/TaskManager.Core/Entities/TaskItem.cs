using System;
using System.ComponentModel.DataAnnotations;
using TaskStatus = TaskManager.Core.Enums.TaskStatus;

namespace TaskManager.Core.Entities
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string? Description { get; set; }

        public TaskStatus Status { get; set; } = TaskStatus.Pending;

        [Range(1, 5, ErrorMessage = "Priority must be between 1 and 5")]
        public int Priority { get; set; } = 3;

        public DateTime? DueDate { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
} 