using System.ComponentModel.DataAnnotations;

namespace miniprojectbackend.DTO
{
    public class CreateTeamDto
    {
        
        public int TeamId { get; set; }

        public string TeamName { get; set; }

        public string Description { get; set; }
    }
}
