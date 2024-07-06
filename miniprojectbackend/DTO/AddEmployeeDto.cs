using System.ComponentModel.DataAnnotations;
using static miniprojectbackend.Models.Employee;

namespace miniprojectbackend.DTO
{
    public class AddEmployeeDto
    {
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

       
        public string Email { get; set; }
       
        public string Password { get; set; }
        
        public department Department { get; set; }

        public DateOnly DateOfJoinee { get; set; }

      
        public employeeType EmployeeType { get; set; }

        public role role { get; set; }

    }
}
