using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks.Dataflow;

namespace miniprojectbackend.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }

        [Required]
        public string ProjectName { get; set; }

        public string Description { get; set; }
        public string GithubLink { get; set; }

        [Column(TypeName = "date")]
        public DateOnly DueDate { get; set; }

        public int? TeamId { get; set; }
        public Team? Team { get; set; }

        public Status ProjectStatus { get; set; }

        public enum Status
        {
            NotStarted,
            Completed,
            Cancelled,
            OnHold,
            InProgress
        }

    }
}
