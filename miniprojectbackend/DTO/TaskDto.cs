using static miniprojectbackend.Models.EmployeeTask;
using TaskStatus = miniprojectbackend.Models.EmployeeTask.TaskStatus;

namespace miniprojectbackend.DTO
{
    public class TaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public TaskStatus taskStatus { get; set; }
    }
}
