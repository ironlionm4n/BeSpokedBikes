using Microsoft.EntityFrameworkCore;

using BeSpokedBikes.Models;

namespace BeSpokedBikes.Context
{
    public class BeSpokedBikesDbContext : DbContext
    {
        public BeSpokedBikesDbContext(DbContextOptions<BeSpokedBikesDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<SalesPerson> SalesPersons { get; set;}
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Discount> Discounts { get; set; }
    }
}
