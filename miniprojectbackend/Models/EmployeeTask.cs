using System.ComponentModel.DataAnnotations;

namespace miniprojectbackend.Models
{
    public class EmployeeTask
    {
        [Key]
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }

        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public TaskStatus taskStatus { get; set; }
        public enum TaskStatus
        {
            Pending,
            Completed
        }
    }
}
