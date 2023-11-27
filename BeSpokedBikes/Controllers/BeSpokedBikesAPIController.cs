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

        [HttpGet("sales-team")]
        public async Task<ActionResult> GetSalesTeam() 
        {
            var salesteam = await _context.SalesPersons.ToListAsync();
            return Ok(salesteam);
        }

        [HttpGet("sales-team/{id}")]
        public async Task<ActionResult> GetSalesPerson(int id)
        {
            var salesPerson = await _context.SalesPersons.FindAsync(id);

            if(salesPerson == null)
            { return NotFound(); }

            return Ok(salesPerson);
        }

        [HttpPut("sales-team/{id}")]
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

        [HttpGet("sales")]
        public async Task<ActionResult> GetSales()
        {
            var sales = _context.Sales.ToList();

            if(sales == null)
            {
                return NotFound();
            }

            // For each sale object in the list of sales update the various properties so there is data assigned to the object returned from this 
            foreach(var sale in sales)
            {
                sale.Product = await _context.Products.FindAsync(sale.ProductId);
                sale.Customer = await _context.Customers.FindAsync(sale.CustomerId);
                sale.SalesPerson = await _context.SalesPersons.FindAsync(sale.SalesPersonId);

                // Commission is calcualted as the difference between the sale price and purchase price times the commission percentage of the product
                // Commission is rounded to 2 decimal places as it represents currency value
                sale.Commission = Math.Round((sale.Product.SalePrice - sale.Product.PurchasePrice) * (decimal)sale.Product.CommissionPercentage, 2);
            }

            return Ok(sales);
        }
    }
}
