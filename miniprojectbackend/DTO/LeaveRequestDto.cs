using static miniprojectbackend.Models.LeaveRequest;

namespace miniprojectbackend.DTO
{
    public class LeaveRequestDto
    {
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        public string Description { get; set; }
        public string Reason { get; set; }
        public LeaveStatus Status { get; set; }

        
    }
}
