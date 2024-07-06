using System.ComponentModel.DataAnnotations;

namespace miniprojectbackend.Models
{
    public class LeaveRequest
    {
        [Key]
        public int LeaveRequestId { get; set; }
        
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        public string Description { get; set; }
        public string Reason {  get; set; }
        public LeaveStatus Status { get; set; }

        public enum LeaveStatus
        {
            Pending,
            Approved,
            Rejected
        }
    }
}
