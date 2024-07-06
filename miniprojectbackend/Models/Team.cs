using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace miniprojectbackend.Models
{
    public class Team
    {
        [Key]
        public int TeamId { get; set; }

        [Required]
        public string TeamName { get; set; }

        public string Description { get; set; }

        public ICollection<Project> Projects { get; set; }



    }
}
