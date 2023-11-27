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
    // Allowing Any Origin as I was getting CORS errors when trying to hit endpoints in the controller from the client application
    options.AddPolicy(name: "AllowAll", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

#region DbContext Seeding
// Creating scoped service for seeding test data
using (var scope = app.Services.CreateScope())
{
    // BeSpokedBikesDbContext instance, used to interact with the in-memory database
    var dbContext = scope.ServiceProvider.GetRequiredService<BeSpokedBikesDbContext>();
    
    // Adding a range of products objects
    dbContext.Products.AddRange(new List<Product> { 
        new Product { 
        Id = 1, 
        Name = "V2 XT", 
        Manufacturer = "Ibis Ripmo", 
        Style = BikeStyle.Mountain,  
        PurchasePrice = 3525.00M,
        SalePrice = 6959.99M,
        QtyOnHand = 10,
        CommissionPercentage = .20
        },
        new Product {
        Id = 2,
        Name = "Allez",
        Manufacturer = "Specialized",
        Style = BikeStyle.Road,
        PurchasePrice = 450.00M,
        SalePrice = 950.99M,
        QtyOnHand = 11,
        CommissionPercentage = .12
        },
        new Product {
        Id = 3,
        Name = "Fit Series 22",
        Manufacturer = "FitBike Co.",
        Style = BikeStyle.BMX,
        PurchasePrice = 325.99M,
        SalePrice = 689.95M,
        QtyOnHand = 20,
        CommissionPercentage = .10
        },
        new Product {
        Id = 4,
        Name = "General Lee",
        Manufacturer = "DK",
        Style = BikeStyle.BMX,
        PurchasePrice = 455.99M,
        SalePrice = 875.99M,
        QtyOnHand = 1,
        CommissionPercentage = .15
        },
        new Product {
        Id = 5,
        Name = "Endurance CF 8",
        Manufacturer = "Canyon",
        Style = BikeStyle.Road,
        PurchasePrice = 1199.00M,
        SalePrice = 2499.99M,
        QtyOnHand = 3,
        CommissionPercentage = .17
        },
    });
    dbContext.SaveChanges();

    // Adding a range of sales person objects
    dbContext.SalesPersons.AddRange(new List<SalesPerson>
    {
        new SalesPerson
        {
            Id = 1,
            FirstName = "Mike",
            LastName = "Smith",
            Address = "123 Somewhere Street",
            PhoneNumber = "5555550000",
            StartDate = new DateTime(2015, 7, 12, 0, 0, 0),
            TerminationDate = new DateTime(2018, 10, 12, 0, 0, 0),
            Manager = "Steve Pryor"
        },
        new SalesPerson
        {
            Id = 2,
            FirstName = "Marvin",
            LastName = "Harrison",
            Address = "321 Elsewhere Road",
            PhoneNumber = "5555551111",
            StartDate = new DateTime(2018, 11, 1, 0, 0, 0),
            TerminationDate = null,
            Manager = "Lisa Zimmerman"
        },
        new SalesPerson
        {
            Id = 3,
            FirstName = "Jennifer",
            LastName = "Williams",
            Address = "111 PeachTree Street",
            PhoneNumber = "5554441234",
            StartDate = new DateTime(2019, 1, 22, 0, 0, 0),
            TerminationDate = null,
            Manager = "Steve Pryor"
        },
        new SalesPerson
        {
            Id = 4,
            FirstName = "Angie",
            LastName = "Richards",
            Address = "4455 PeachTree Blvd",
            PhoneNumber = "4705551221",
            StartDate = new DateTime(2020, 3, 1, 0, 0, 0),
            TerminationDate = null,
            Manager = "Lisa Zimmerman"
        }
    });
    dbContext.SaveChanges();

    // Adding a range of customer objects
    dbContext.Customers.AddRange(new List<Customer> {
        new Customer
        {
            Id = 1,
            FirstName = "Josh",
            LastName = "Jacobs",
            Address = "323 Upthere Place",
            PhoneNumber = "5555552222",
            StartDate = new DateTime(2019, 11, 25, 0,0,0),
        },
        new Customer
        {
            Id = 2,
            FirstName = "Mike",
            LastName = "Hall",
            Address = "454 Downthere Place",
            PhoneNumber = "5555553333",
            StartDate = new DateTime(2020, 1, 5, 0,0,0),
        },
        new Customer
        {
            Id = 3,
            FirstName = "Pamela",
            LastName = "Daley",
            Address = "698 Overthere Drive",
            PhoneNumber = "5555554444",
            StartDate = new DateTime(2021, 6, 11, 0,0,0),
        },
        new Customer
        {
            Id = 4,
            FirstName = "Wendy",
            LastName = "Iris",
            Address = "1234 PeachTree Court",
            PhoneNumber = "4445551234",
            StartDate = new DateTime(2022, 7, 18, 0,0,0),
        },
        new Customer
        {
            Id = 5,
            FirstName = "Samantha",
            LastName = "Thompson",
            Address = "5678 Wilimington Pike",
            PhoneNumber = "7875556543",
            StartDate = new DateTime(2023, 8, 1, 0,0,0),
        }
    });
    dbContext.SaveChanges();

    // Adding a range of sale objects
    dbContext.Sales.AddRange(new List<Sale>
    {
        new Sale
        {
            ProductId = 1,
            SalesPersonId = 1,
            CustomerId = 1,
            SaleDate = new DateTime(2021, 2, 22, 0, 0, 0),
        },
        new Sale
        {
            ProductId = 2,
            SalesPersonId = 1,
            CustomerId = 2,
            SaleDate = new DateTime(2019, 12, 21, 0, 0, 0),
        },
        new Sale
        {
            ProductId = 3,
            SalesPersonId = 2,
            CustomerId = 3,
            SaleDate = new DateTime(2020, 7, 11, 0, 0, 0),
        },
        new Sale
        {
            ProductId = 5,
            SalesPersonId = 3,
            CustomerId = 4,
            SaleDate = new DateTime(2021, 4, 5, 0, 0, 0),
        },
        new Sale
        {
            ProductId = 4,
            SalesPersonId = 4,
            CustomerId = 5,
            SaleDate = new DateTime(2022, 3, 10, 0, 0, 0),
        },
        new Sale
        {
            ProductId = 3,
            SalesPersonId = 2,
            CustomerId = 3,
            SaleDate = new DateTime(2023, 6, 1, 0, 0, 0),
        },
        new Sale
        {
            ProductId = 1,
            SalesPersonId = 4,
            CustomerId = 4,
            SaleDate = new DateTime(2023, 1, 11, 0, 0, 0),
        },
        new Sale
        {
            ProductId = 4,
            SalesPersonId = 4,
            CustomerId = 5,
            SaleDate = new DateTime(2022, 2, 1, 0, 0, 0),
        },
        new Sale
        {
            ProductId = 5,
            SalesPersonId = 3,
            CustomerId = 1,
            SaleDate = new DateTime(2023, 2, 15, 0, 0, 0),
        }
    });
    dbContext.SaveChanges();
}
#endregion

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
