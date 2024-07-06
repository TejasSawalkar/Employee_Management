using System.ComponentModel.DataAnnotations;

namespace miniprojectbackend.Models
{
    public class ProfilePhoto
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Content { get; set; }
        public string ContentType { get; set; }
        public int EmployeeId { get; set; }

    }
}
