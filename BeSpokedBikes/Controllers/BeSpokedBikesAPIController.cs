using BeSpokedBikes.Context;
using BeSpokedBikes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet("products/{id}")] public async Task<ActionResult> GetProduct(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
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
        public async Task<ActionResult> GetSalesTeam() 
        {
            var salesteam = await _context.SalesPersons.ToListAsync();
            return Ok(salesteam);
        }

        [HttpGet("sales/{id}")]
        public async Task<ActionResult> GetSalesPerson(int id)
        {
            var salesPerson = await _context.SalesPersons.FindAsync(id);

            if(salesPerson == null)
            { return NotFound(); }

            return Ok(salesPerson);
        }

        [HttpPut("sales/{id}")]
        public async Task<ActionResult> UpdateSalesPerson(int id, [FromBody] SalesPerson newProduct)
        {
            var salesPerson = await _context.SalesPersons.FindAsync(id);
            if (salesPerson == null)
            {
                return NotFound();
            }

            salesPerson.FirstName = newProduct.FirstName;
            salesPerson.LastName = newProduct.LastName;
            salesPerson.PhoneNumber = newProduct.PhoneNumber;
            salesPerson.Address = newProduct.Address;
            salesPerson.StartDate = newProduct.StartDate;
            salesPerson.TerminationDate = newProduct.TerminationDate;
            salesPerson.Manager = newProduct.Manager;

            await _context.SaveChangesAsync();

            return Ok(salesPerson);

        }

        [HttpGet("customers")]
        public async Task<ActionResult> GetCustomers()
        {
            var customers = await _context.Customers.ToListAsync();
            if(customers == null)
            {
                return NotFound();
            }

            return Ok(customers);
        }
    }
}
