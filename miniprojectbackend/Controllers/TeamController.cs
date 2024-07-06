using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miniprojectbackend.Context;
using miniprojectbackend.DTO;
using miniprojectbackend.Models;
using System.Threading.Tasks;

namespace miniprojectbackend.Controllers
{
    [Route("/teams")]
    [ApiController]
    public class TeamController : Controller
    {
        private readonly AppDbContext _appDbContext;


        public TeamController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet("getTeams")]
        public async Task<ActionResult<List<Team>>> GetTeams()
        {
            var teams=await _appDbContext.Teams.ToListAsync();
            if(!teams.Any())
            {
                return BadRequest("No teams");
            }
            return teams;

        }

        [HttpGet("getTeam/{teamId}")]
        public async Task<ActionResult<Team>> GetTeam(int teamId)
        {
            var team=await _appDbContext.Teams.FirstOrDefaultAsync(t=>t.TeamId==teamId);
            if(team==null)
            {
                return BadRequest("Team does not exists");
            }
            return team;
        }

        [HttpGet("{teamId}/getEmployees")]
        public async Task<ActionResult<List<Employee>>> GetTeamEmployees(int teamId)
        {
            var team= await _appDbContext.Teams.FirstOrDefaultAsync(e=>e.TeamId==teamId);

            if(team == null)
            {
                return NotFound("Team not found");
            }

            var emps=await _appDbContext.Employees.Where(e=>e.TeamId== teamId).ToListAsync();
            return emps;
        }

        [HttpPost("/{teamId}/addEmployee/{employeeId}")]
        public async Task<ActionResult> AddEmployeeToTeam(int teamId, int employeeId)
        {
            var team = await _appDbContext.Teams.FindAsync(teamId);
            if (team == null)
            {
                return NotFound();
            }

            var employee = await _appDbContext.Employees.FindAsync(employeeId);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            // Update the employee's team ID
            employee.TeamId = teamId;

            try
            {
                // Save changes to the database
                await _appDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Handle concurrency conflict
                // Log or handle the conflict appropriately
                return Conflict("Concurrency conflict occurred. Please try again.");
            }

            return Ok();
        }


        [HttpDelete("/{teamId}/deleteEmployee/{employeeId}")]
        public async Task<ActionResult> DeleteEmployeeFromTeam(int teamId,int employeeId)
        {
            var employee = await _appDbContext.Employees.FirstOrDefaultAsync(e => e.Id == employeeId);

            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            var team = await _appDbContext.Teams.FirstOrDefaultAsync(e => e.TeamId == teamId);

            if (team == null)
            {
                return NotFound("Team not found");
            }
            employee.TeamId = null;
            _appDbContext.Entry(employee).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
            return Ok();


        }

        [HttpDelete("/deleteTeam/{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _appDbContext.Teams.FindAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            _appDbContext.Teams.Remove(team);
            await _appDbContext.SaveChangesAsync();

            return Ok("Team Deleted");
        }

        [HttpPost("/createTeam")]
        public async Task<ActionResult> CreateTeam(CreateTeamDto createTeamDto)
        {
            var team = new Team
            {
                TeamName = createTeamDto.TeamName,
                Description = createTeamDto.Description,

            };

            _appDbContext.Teams.Add(team);
            await _appDbContext.SaveChangesAsync();

            return Ok(team);
        }

        [HttpPut("/updateTeam/{teamId}")]
        public async Task<ActionResult> UpdateTeam(int teamId,Team team)
        {
            if(teamId!=team.TeamId)
            {
                return BadRequest();
            }
            _appDbContext.Entry(team).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();

            return Ok("Team Updated");
        }

       
    }

}

