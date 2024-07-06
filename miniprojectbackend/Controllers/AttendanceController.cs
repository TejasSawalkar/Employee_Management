using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miniprojectbackend.Context;
using miniprojectbackend.Models;

namespace miniprojectbackend.Controllers
{
    [Route("attendance/[controller]")]
    [ApiController]
    public class AttendanceController : Controller
    {
        private readonly AppDbContext _context;

        public AttendanceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn([FromBody] int employeeId)
        {
            var employee = await _context.Employees.FindAsync(employeeId);
            if (employee == null)
            {
                return NotFound(new { Message = "Employee Not Found!" });
            }
            var attendanceRecord = new AttendanceRecord
            {
                EmployeeId = employeeId,
                CheckInTime = DateTime.Now,
                Employee=employee,
                
            };
            await _context.AttendanceRecords.AddAsync(attendanceRecord);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Check-in recorded successfully!" });
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckOut([FromBody] int employeeId)
        {
            var employee = await _context.Employees.FindAsync(employeeId);
            if (employee == null)
            {
                return NotFound(new { Message = "Employee Not Found!" });
            }

            var attendanceRecord = await _context.AttendanceRecords
                .Where(a => a.EmployeeId == employeeId && a.CheckOutTime == null)
                .OrderByDescending(a => a.CheckOutTime)
                .FirstOrDefaultAsync();

            if (attendanceRecord == null)
            {
                return NotFound(new { Message = "No active check-in found for the employee!" });
            }

            attendanceRecord.CheckOutTime = DateTime.Now;
            _context.AttendanceRecords.Update(attendanceRecord);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Check-out recorded successfully!" });
        }

        [HttpGet("records/{employeeId}")]
        public async Task<IActionResult> GetAttendanceRecords(int employeeId)
        {
            var records = await _context.AttendanceRecords
                .Where(a => a.EmployeeId == employeeId)
                .ToListAsync();

            if (!records.Any())
            {
                return NotFound(new { Message = "No attendance records found for the employee!" });
            }

            return Ok(records);
        }

        [HttpGet("employee/{employeeId}")]
        public async Task<IActionResult> GetAttendanceRecordsForEmployee(int employeeId)
        {
            var records = await _context.AttendanceRecords
                .Where(a => a.EmployeeId == employeeId)
                .ToListAsync();

            return Ok(records);
        }

        [HttpGet("getEmployeeRecord/{id}")]

        public async Task<ActionResult<IEnumerable<AttendanceRecord>>> getEmployeeRecord(int id)
        {
            var records = await _context.AttendanceRecords
                .Where(a => a.EmployeeId == id)
                .Include(e => e.Employee)
                .ToListAsync();
            return Ok(records);
                
        }
    }
}
