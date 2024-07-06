using static miniprojectbackend.Models.Project;

namespace miniprojectbackend.DTO
{
    public class ProjectDto
    {
        public string ProjectName { get; set; }
        public string Description { get; set; }
        public string GithubLink { get; set; }
        public DateOnly DueDate { get; set; }

        public Status Status { get; set; }
    }
}
