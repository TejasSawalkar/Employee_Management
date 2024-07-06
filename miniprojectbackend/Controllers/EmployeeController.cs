using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miniprojectbackend.Context;
using miniprojectbackend.Models;
using System.Text.RegularExpressions;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using miniprojectbackend.DTO;

namespace miniprojectbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _authContext;

        public EmployeeController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody] SignInDto signinDto)
        {
            if (signinDto == null)
                return BadRequest();

            var employee = await _authContext.Employees.FirstOrDefaultAsync(x => x.Email == signinDto.Email && x.Password == signinDto.Password && x.Role!=0);
            if (employee == null)
                return NotFound(new { Message = "Employee Not Found!" });

            employee.Token = CreateJwt(employee);

            _authContext.Employees.Update(employee);
            await _authContext.SaveChangesAsync();

            return Ok(new
            {
                Token = employee.Token,
                Message = "Login Success!",

            });
        }


        private string CreateJwt(Employee emp)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret..................");
            var identity = new ClaimsIdentity(new Claim[]
            {
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

        [HttpGet]
        public async Task<ActionResult<Employee>> GetAllEmployee()
        {
            return Ok(await _authContext.Employees
                .Include(lr=>lr.LeaveRequest)
                .ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById(int id)
        {
            var employee = await _authContext.Employees
                .Include(lr=>lr.LeaveRequest)
                .FirstOrDefaultAsync(e=>e.Id==id);
                
            if (employee == null)
            {
                return NotFound(new { Message = "Employee Not Found!" });
            }

            return Ok(employee);
        }



    }
}
