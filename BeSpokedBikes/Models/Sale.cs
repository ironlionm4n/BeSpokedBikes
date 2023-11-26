using System.ComponentModel.DataAnnotations;

namespace BeSpokedBikes.Models
{
    public class Sale
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
        
        public int SalesPersonId { get; set; }
        public SalesPerson SalesPerson { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        
        public DateTime SaleDate { get; set; }
    }
}
