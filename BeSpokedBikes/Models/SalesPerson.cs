namespace BeSpokedBikes.Models
{
    public class SalesPerson : Person
    {
        public int Id { get; set; }
        public DateTime? TerminationDate { get; set; }
        public string Manager { get; set; } = "";
    }
}
