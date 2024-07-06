using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using miniprojectbackend.Context;
using miniprojectbackend.DTO;
using miniprojectbackend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace miniprojectbackend.Controllers
{
    [Route("/admin")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly AppDbContext _appDbContext;


        public AdminController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost("/signIn")]
        public async Task<ActionResult> SignIn([FromBody] SignInDto signInDto)
        {
            if (signInDto == null)
            {
                return BadRequest();
            }
            
            var admin=await _appDbContext.Employees.FirstOrDefaultAsync(x=> x.Email==signInDto.Email && x.Password==signInDto.Password && x.Role==0);

            if(admin == null)
            {
                return NotFound(new { Message = "Employee not found!" });
            }

            admin.Token = CreateJwt(admin);
            _appDbContext.Employees.Update(admin);
            await _appDbContext.SaveChangesAsync();
            return Ok(new
            {
                Token = admin.Token,
                Id = admin.Id,
                Message = "Admin Login Success"
            });
            
        }
        private string CreateJwt(Employee emp)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret..................");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier,emp.Id.ToString()),
                new Claim(ClaimTypes.Name,$"{emp.FirstName}:{emp.LastName}"),
                new Claim(ClaimTypes.Email, emp.Email)
                
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private Task<bool> CheckEmailExistAsync(string email)
            => _appDbContext.Employees.AnyAsync(x => x.Email == email);

        private string CheckPasswwordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
                sb.Append("Minimum Password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contain special chars" + Environment.NewLine);
            return sb.ToString();
        }

        [HttpPost("addEmployee")]
        public async Task<IActionResult> AddEmployee([FromBody] AddEmployeeDto addEmployeeDto)
        {
            if(await _appDbContext.Employees.AnyAsync(e => e.Email == addEmployeeDto.Email))
            {
                return BadRequest("Employee already exists");
            }

            var employee = new Employee
            {
                FirstName = addEmployeeDto.FirstName,
                MiddleName = addEmployeeDto.MiddleName,
                LastName = addEmployeeDto.LastName,
                Email = addEmployeeDto.Email,
                Password = addEmployeeDto.Password,
                Department = addEmployeeDto.Department,
                DateOfJoinee = addEmployeeDto.DateOfJoinee,
                EmployeeType = addEmployeeDto.EmployeeType,
                Role = addEmployeeDto.role
            };
            _appDbContext.Employees.Add(employee);
            await _appDbContext.SaveChangesAsync();


            return Ok(addEmployeeDto);
            
        }

        [HttpDelete("/deleteTask/{employeeId}/{taskId}")]
        public async Task<ActionResult> DeleteTask(int employeeId,int taskId)
        {
            var employee=await _appDbContext.Employees.Include(e=>e.EmployeeTasks).FirstOrDefaultAsync(e=>e.Id==employeeId);

            if (employee == null)
            {
                return NotFound();
            }

            var task = employee.EmployeeTasks.FirstOrDefault(t => t.TaskId==taskId);

            if(task== null)
            {
                return NotFound();
            }

            _appDbContext.EmployeeTasks.Remove(task);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employee emp)
        {
           var employee=await _appDbContext.Employees.FirstOrDefaultAsync(e=>e.Id==id);

            if(employee == null)
            {
                return BadRequest("Employee not found");
            }

            employee.FirstName = emp.FirstName;
            employee.MiddleName= emp.MiddleName;
            employee.LastName = emp.LastName;
            employee.Email = emp.Email;
            employee.Password = emp.Password;
            employee.EmployeeType = emp.EmployeeType;
            employee.TeamId=emp.TeamId;


            
          

            _appDbContext.Employees.Update(employee);
            await _appDbContext.SaveChangesAsync();

            var empl = new Employee
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                Email = employee.Email,
                Role = employee.Role
            };

            return Ok(empl);


        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var employee=await _appDbContext.Employees.FirstOrDefaultAsync(e=>e.Id == id);

            if(employee == null)
            {
                return BadRequest("Employee not found");
            }

            _appDbContext.Employees.Remove(employee);
            await _appDbContext.SaveChangesAsync();

            return Ok("Employee Deleted");
        }




    }
}
