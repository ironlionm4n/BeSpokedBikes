namespace BeSpokedBikes.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Manufacturer { get; set; } = "";
        public BikeStyle Style { get; set; }
        public decimal PurchasePrice {  get; set; }
        public decimal SalePrice { get; set; }
        public int QtyOnHand { get; set; }
        public double CommissionPercentage { get; set; }
    }
}
