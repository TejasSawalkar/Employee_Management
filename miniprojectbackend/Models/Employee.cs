using System.ComponentModel.DataAnnotations;

namespace miniprojectbackend.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Designation { get; set; }

        [Required]
        public department Department { get; set; }

        [Required]
        public DateOnly DateOfJoinee { get; set; }

        [Required]
        public employeeType EmployeeType { get; set; }
        public string JoiningUpdate { get; set; }
        public string Token { get; set; }
        
        public LeaveRequest LeaveRequest { get; set; }

        [Required]
        public role Role { get; set; }
        public byte[] ProfilePhoto { get; set; }

        public int? TeamId { get; set; }

        public enum department
        {
            HR,
            IT,
            Finance,
            Marketing,
            Sales,
            Admin,
            BusinessDevelopment,
            Security,
            Development

        }
        public enum employeeType
        {
            Fulltime,
            Parttime,
            Temporary,
            Seasonal,
            Leased,
            Intern
        }
        public enum role
        {
            Admin,
            User,
            Viewer
        }
        public List<EmployeeTask> EmployeeTasks { get; set; }=new List<EmployeeTask>();
        
        public List<AttendanceRecord> attendanceRecords { get; set; }

        
    }
}
