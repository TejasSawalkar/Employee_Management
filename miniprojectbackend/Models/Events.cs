using System.ComponentModel.DataAnnotations;

namespace miniprojectbackend.Models
{
    public class Events
    {
        [Key]
        public int Id { get; set; }

        public string EventName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }



     


    }
}
