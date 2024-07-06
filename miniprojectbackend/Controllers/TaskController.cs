using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miniprojectbackend.Context;
using miniprojectbackend.DTO;
using miniprojectbackend.Models;


namespace miniprojectbackend.Controllers
{
    [Route("Task/")]
    [ApiController]
    public class TaskController : Controller
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext appDbContext)
        {
            _context= appDbContext;
        }

        [HttpPost("{id}/addTask")]
        public async Task<ActionResult<EmployeeTask>> AddTask(int id, TaskDto taskDto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            var employeetask = new EmployeeTask
            {
                Title = taskDto.Title,
                Description = taskDto.Description,
                DueDate = taskDto.DueDate,
                taskStatus = taskDto.taskStatus
            };

            employeetask.Employee = employee;
            employeetask.EmployeeId = id;
            _context.EmployeeTasks.Add(employeetask);
            await _context.SaveChangesAsync();
            return Ok(taskDto);
        }
        [HttpGet("GetAllTask")]
        public async Task<ActionResult<IEnumerable<EmployeeTask>>> GetAllTasks()
        {
            var tasks = await _context.EmployeeTasks
                .Include(e => e.Employee)
                .ToListAsync();
            return Ok(tasks);
        }


        [HttpGet("{id}/tasks")]
        public async Task<ActionResult<IEnumerable<EmployeeTask>>> GetTasks(int id)
        {
            var employee = await _context.Employees.Include(e => e.EmployeeTasks).FirstOrDefaultAsync(e => e.Id == id);
            
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee.EmployeeTasks);
        }

        [HttpGet("getTask/{taskId}")]
        public async Task<ActionResult<EmployeeTask>> GetTask(int taskId)
        {
            var employeeTask=await _context.EmployeeTasks
                .Include(e=>e.Employee)
                .FirstOrDefaultAsync(t=>t.TaskId == taskId);
            if (employeeTask == null)
            {
                return BadRequest("Task not found");
            }

            return Ok(employeeTask);
        }


        [HttpDelete("deleteTask/{taskId}")]
        public async Task<ActionResult> DeleteTask(int taskId)
        {
            var task=await _context.EmployeeTasks.FindAsync(taskId);

            if (task == null)
            {
                return BadRequest("Task not found");
            }
            _context.EmployeeTasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok("Task Deleted");
        }

        [HttpPut("UpdateTask/{taskId}")]
        public async Task<ActionResult<EmployeeTask>> UpdateTask(int taskId,EmployeeTask task)
        {
            var employeeTask = await _context.EmployeeTasks.FindAsync(taskId);
            if (employeeTask == null)
            {
                return BadRequest("task not found");
            }
            employeeTask.Title = task.Title;
            employeeTask.DueDate = task.DueDate;
            employeeTask.Description=task.Description;
            employeeTask.taskStatus=task.taskStatus;

            _context.EmployeeTasks.Update(employeeTask);
            await _context.SaveChangesAsync();

            return Ok(employeeTask);
        }

    }
}
