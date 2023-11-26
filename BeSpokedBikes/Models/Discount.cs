namespace BeSpokedBikes.Models
{
    public class Discount
    {
        public int Id { get; set; }
        public Product Product { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public double DiscountPercentage { get; set; }
    }
}
