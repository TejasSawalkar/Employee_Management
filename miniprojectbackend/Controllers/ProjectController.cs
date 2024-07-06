using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miniprojectbackend.Context;
using miniprojectbackend.DTO;
using miniprojectbackend.Models;
using System.Text.Json.Serialization;
using System.Text.Json;


namespace miniprojectbackend.Controllers
{
    public class ProjectController : Controller
    {
        private readonly AppDbContext _context;

        public ProjectController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Projects/AssignToTeam
        [HttpPost("{projectId}/assign/{teamId}")]
        public async Task<IActionResult> AssignProjectToTeam(int projectId, int teamId)
        {
            var project = await _context.Projects.SingleOrDefaultAsync(p => p.ProjectId == projectId);
            if (project == null)
            {
                return NotFound(new { Message = "Project not found" });
            }

            var team = await _context.Teams.SingleOrDefaultAsync(t => t.TeamId == teamId);
            if (team == null)
            {
                return NotFound(new { Message = "Team not found" });
            }

            project.TeamId = teamId;
            project.Team = team;

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Project assigned to team successfully" });
        }

        [HttpGet("getTeamFromProject/{projectId}")]
        public async Task<ActionResult<Team>> GetTeamFromProject(int projectId)
        {
            var project = await _context.Projects
                .Include(p => p.Team)
                .FirstOrDefaultAsync(p => p.ProjectId == projectId);
            if (project == null)
            {
                return BadRequest("Project not found");
            }
            return project.Team;
            
        }

        [HttpPost("/createProject")]
        public async Task<ActionResult<Project>> CreateProject([FromBody] ProjectDto projectDto)
        {

            var project = new Project
            {
                ProjectName=projectDto.ProjectName,
                Description=projectDto.Description,
                DueDate=projectDto.DueDate,
                ProjectStatus=projectDto.Status,
                GithubLink=projectDto.GithubLink
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return Ok(project);
        }



        [HttpDelete("/deleteProject/{ProjectId}")]
        public async Task<ActionResult> DeleteProject(int ProjectId)
        {
            var project = await _context.Projects.FindAsync(ProjectId);
            if (project == null)
            {
                return BadRequest("Project does not exist");
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return Ok("Project Deleted");
        }

        [HttpGet("getProjects")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {


            var projects = await _context.Projects.Include(p => p.Team).ToListAsync();

            
            return Ok(projects);
        }

        [HttpGet("getProject/{ProjectId}")]
        public async Task<ActionResult<Project>> getProject(int projectId)
        {
            var project= await _context.Projects
                .Include(p => p.Team)
                .FirstOrDefaultAsync(p => p.ProjectId == projectId);
            if (project == null)
            {
                return BadRequest("Project does not exists");
            }

            return Ok(project);
        }

        [HttpPut("updateProject/{projectId}")]
        public async Task<ActionResult<Project>> UpdateProject(int projectId,[FromBody]Project proj)
        {
            var project=await _context.Projects.FirstOrDefaultAsync(p=>p.ProjectId == projectId);

            if (project == null)
            {
                return BadRequest("Invalid projectId");
            }

            project.ProjectName=proj.ProjectName;
            project.Description=proj.Description;
            project.DueDate=proj.DueDate;
            project.ProjectStatus=proj.ProjectStatus;
            project.GithubLink = proj.GithubLink;

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
            return Ok(project);
        }

        [HttpGet("{projectId}/Team")]
        public async Task<ActionResult<Team>> GetTeamByProjectId(int projectId)
        {
            var project = await _context.Projects
                .Include(p => p.Team)
                .FirstOrDefaultAsync(p => p.ProjectId == projectId);

            if (project == null)
            {
                return NotFound();
            }

            return project.Team;
        }



    }
}
