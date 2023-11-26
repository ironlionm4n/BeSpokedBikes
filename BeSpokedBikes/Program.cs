using BeSpokedBikes.Context;
using BeSpokedBikes.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<BeSpokedBikesDbContext>(options => options.UseInMemoryDatabase("BeSpokedBikesDb"));

// Adding CORS Policy
builder.Services.AddCors(options =>
{
    // Allowing Any Origin as I was getting CORS errors when trying to hit endpoints in the controller
    options.AddPolicy(name: "AllowAll", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Seeding data in the dbContext
using(var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<BeSpokedBikesDbContext>();
    if(!dbContext.Products.Any())
    {
        dbContext.Products.AddRange(new List<Product> { 
            new Product { 
            Id = 1, 
            Name = "V2 XT", 
            Manufacturer = "Ibis Ripmo", 
            Style = BikeStyle.Mountain,  
            PurchasePrice = 6959.00M,
            SalePrice = 6459.00M,
            QtyOnHand = 10,
            CommissionPercentage = .20
            },
            new Product {
            Id = 2,
            Name = "Allez",
            Manufacturer = "Specialized",
            Style = BikeStyle.Road,
            PurchasePrice = 950.00M,
            SalePrice = 599.00M,
            QtyOnHand = 11,
            CommissionPercentage = .20
            },
            new Product {
            Id = 3,
            Name = "Fit Series 22",
            Manufacturer = "FitBike Co.",
            Style = BikeStyle.BMX,
            PurchasePrice = 689.95M,
            SalePrice = 399.95M,
            QtyOnHand = 20,
            CommissionPercentage = .20
            },
        });
        dbContext.SaveChanges();

        dbContext.SalesPersons.AddRange(new List<SalesPerson>
        {
            new SalesPerson
            {
                Id = 1,
                FirstName = "Mike",
                LastName = "Smith",
                Address = "123 Somewhere Street",
                PhoneNumber = "5555550000",
                StartDate = DateTime.Now,
                TerminationDate = null,
                Manager = "Steve Miller"
            },
            new SalesPerson
            {
                Id = 2,
                FirstName = "Marvin",
                LastName = "Harrison",
                Address = "321 Elsewhere Road",
                PhoneNumber = "5555551111",
                StartDate = DateTime.Now,
                TerminationDate = null,
                Manager = "Steve Miller"
            }
        });
        dbContext.SaveChanges();
        dbContext.Customers.AddRange(new List<Customer> {
            new Customer
            {
                Id = 1,
                FirstName = "Josh",
                LastName = "Jacobs",
                Address = "323 Upthere Place",
                PhoneNumber = "5555552222",
                StartDate = DateTime.Now,
            },
            new Customer
            {
                Id = 2,
                FirstName = "Mike",
                LastName = "Hall",
                Address = "454 Downthere Place",
                PhoneNumber = "5555553333",
                StartDate = DateTime.Now,
            },
            new Customer
            {
                Id = 3,
                FirstName = "Tim",
                LastName = "Allen",
                Address = "698 Overthere Drive",
                PhoneNumber = "5555554444",
                StartDate = DateTime.Now,
            }
        });
        dbContext.SaveChanges();

        if (!dbContext.Sales.Any())
        {
            dbContext.Sales.AddRange(new List<Sale>
            {
                new Sale
                {
                    ProductId = 1,
                    SalesPersonId = 1,
                    CustomerId = 1,
                    SaleDate = DateTime.Now,
                },
                new Sale
                {
                    ProductId = 2,
                    SalesPersonId = 1,
                    CustomerId = 2,
                    SaleDate = DateTime.Now,
                },
                new Sale
                {
                    ProductId = 3,
                    SalesPersonId = 2,
                    CustomerId = 3,
                    SaleDate = DateTime.Now,
                }
            });
            dbContext.SaveChanges();
        }
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
