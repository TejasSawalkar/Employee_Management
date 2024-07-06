using static miniprojectbackend.Models.Employee;

namespace miniprojectbackend.DTO
{
    public class UpdateEmployeeDto
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Designation { get; set; }
        public department? Department { get; set; }
        public DateTime? DateOfJoinee { get; set; }
        public employeeType? EmployeeType { get; set; }
        public string JoiningUpdate { get; set; }
    }
}
