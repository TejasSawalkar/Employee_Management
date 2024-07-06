using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using miniprojectbackend.Context;
using miniprojectbackend.Models;

namespace miniprojectbackend.Controllers
{
    [Route("/profilephoto")]
    [ApiController]
    public class ProfilePhotoController : Controller
    {
        private readonly AppDbContext _appDbContext;


        public ProfilePhotoController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }



        [HttpPost("{id}/upload-photo")]
        public async Task<IActionResult> UploadProfilePhoto(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var employee = await _appDbContext.Employees.FindAsync(id);
            if (employee == null)
                return NotFound("Employee not found.");

            using (var memoryStream = new System.IO.MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                employee.ProfilePhoto = memoryStream.ToArray();
            }

            await _appDbContext.SaveChangesAsync();

            return Ok("Profile photo updated successfully.");
        }

    }
}
 