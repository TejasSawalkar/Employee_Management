using System.ComponentModel.DataAnnotations;

namespace miniprojectbackend.Models
{
    public class AttendanceRecord
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }
        public DateTime CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }

       
    }
}
