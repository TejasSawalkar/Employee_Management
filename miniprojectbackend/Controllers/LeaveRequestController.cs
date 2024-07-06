using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miniprojectbackend.Context;
using miniprojectbackend.DTO;
using miniprojectbackend.Models;
using static miniprojectbackend.Models.LeaveRequest;

namespace miniprojectbackend.Controllers
{
    [Route("api/leaveRequests")]
    public class LeaveRequestController : Controller
    {
        private readonly AppDbContext _context;

        public LeaveRequestController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveRequest>>> GetLeaveRequests()
        {
            return await _context.LeaveRequests.ToListAsync();


        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveRequest>> GetRequestById(int id)
        {

            var leaveRequest = await _context.LeaveRequests.FirstOrDefaultAsync(e => e.LeaveRequestId == id);

            if (leaveRequest == null)
            {
                return NotFound();
            }

            return Ok(leaveRequest);
        }

        [HttpGet("/getRequestByEmpId/{id}")]
        public async Task<ActionResult<LeaveRequest>> getRequestByEmpId(int id)
        {
            var employee=await _context.Employees.Include(e=>e.LeaveRequest).FirstOrDefaultAsync(em=>em.Id==id);
            if(employee == null)
            {
                return BadRequest("Employee not found");
            }
            return Ok(employee.LeaveRequest);
        }



        [HttpPost("{id}")]
        public async Task<ActionResult<LeaveRequest>> PostLeaveRequest(int id, [FromBody] LeaveRequestDto leaveRequestDto)
        {
            if (leaveRequestDto == null)
            {
                return BadRequest("Leave request data is required.");
            }

            var employee = await _context.Employees
                .Include(e => e.LeaveRequest)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null)
            {
                return NotFound("Employee not found."); 
            }

            if (employee.LeaveRequest != null)
            {
                return BadRequest("Employee already has a leave request.");
            }

            var leaveRequest = new LeaveRequest
            {
                Reason = leaveRequestDto.Reason,
                Description = leaveRequestDto.Description,
                Status = leaveRequestDto.Status,
                StartDate = leaveRequestDto.StartDate,
                EndDate = leaveRequestDto.EndDate,
                EmployeeId = employee.Id,
                Employee = employee
            };

            _context.LeaveRequests.Add(leaveRequest);
            employee.LeaveRequest = leaveRequest;

            await _context.SaveChangesAsync();
            return Ok(leaveRequest);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeaveRequest(int id, [FromBody] LeaveRequest leaveRequest)
        {
            if (leaveRequest == null)
            {
                return BadRequest("Invalid request body");
            }
            if (id != leaveRequest.LeaveRequestId)
            {
                return BadRequest("LeaveRequestId in the request body does not match the ID in the route");
            }

            var existingLeaveRequest = await _context.LeaveRequests.FindAsync(id);
            if (existingLeaveRequest == null)
            {
                return NotFound("Leave request not found");
            }

            // Update the existingLeaveRequest object with data from leaveRequest
            existingLeaveRequest.StartDate = leaveRequest.StartDate;
            existingLeaveRequest.EndDate = leaveRequest.EndDate;
            existingLeaveRequest.Reason = leaveRequest.Reason;
            existingLeaveRequest.Status = leaveRequest.Status;
            existingLeaveRequest.Description = leaveRequest.Description;
            // Add other properties as needed

            try
            {
                _context.LeaveRequests.Update(existingLeaveRequest);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveRequestExists(id))
                {
                    return NotFound("Leave request not found");
                }
                else
                {
                    throw; // Handle other exceptions if needed
                }
            }

            return Ok("Leave request updated successfully");
        }
        private bool LeaveRequestExists(int id)
        {
            return _context.LeaveRequests.Any(e => e.LeaveRequestId == id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeaveRequest(int id)
        {
            var leaveRequest = await _context.LeaveRequests.FindAsync(id);
            if (leaveRequest == null)
            {
                return NotFound();
            }


            _context.LeaveRequests.Remove(leaveRequest);
            await _context.SaveChangesAsync();



            return Ok("Request deleted");
        }





    }
}
