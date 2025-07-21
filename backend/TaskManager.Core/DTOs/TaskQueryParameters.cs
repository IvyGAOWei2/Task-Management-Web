using TaskStatus = TaskManager.Core.Enums.TaskStatus;

namespace TaskManager.Core.DTOs
{
    public class TaskQueryParameters
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SearchTerm { get; set; }
        public TaskStatus? Status { get; set; }
        public int? Priority { get; set; }
        public string? SortBy { get; set; } = "CreatedAt";
        public bool SortDescending { get; set; } = true;
    }
} 