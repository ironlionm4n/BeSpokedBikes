using BeSpokedBikes.Context;
using BeSpokedBikes.Models;
using Microsoft.AspNetCore.Mvc;

namespace BeSpokedBikes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BeSpokedBikesAPIController : ControllerBase
    {
        private readonly BeSpokedBikesDbContext _context;

        public BeSpokedBikesAPIController(BeSpokedBikesDbContext context)
        {
            _context = context;
        }

        [HttpGet("products")]
        public ActionResult GetAllProducts()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        [HttpGet("products/{id}")] public ActionResult GetProduct(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if(product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPut("products/{id}")]
        public async Task<ActionResult> UpdateProduct(int id, [FromBody] Product newProduct)
        {
            var product = await _context.Products.FindAsync(id);
            if(product == null)
            {
                return NotFound();
            }

            product.Name = newProduct.Name;
            product.Manufacturer = newProduct.Manufacturer;
            product.Style = newProduct.Style;
            product.PurchasePrice = newProduct.PurchasePrice;
            product.SalePrice = newProduct.SalePrice;
            product.QtyOnHand = newProduct.QtyOnHand;
            product.CommissionPercentage = newProduct.CommissionPercentage;

            await _context.SaveChangesAsync();

            return Ok(product);

        }

        [HttpGet("sales")]
        public ActionResult GetSalesTeam() 
        {
            var salesteam = _context.SalesPersons.ToList();
            return Ok(salesteam);
        }
    }
}
