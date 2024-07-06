namespace miniprojectbackend.DTO
{
    public class EmployeeTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public TaskStatus taskStatus { get; set; }
        public enum TaskStatus
        {
            Pending,
            Completed
        }
    }
}
