using ProductCatalog.Models.Entities;

namespace ProductCatalog.Database
{
    public class DbContextFaker
    {
        private readonly IServiceProvider _serviceProvider;

        public DbContextFaker(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task InsertFakeData()
        {
            using var scope = _serviceProvider.CreateScope();

            var dbContext = scope.ServiceProvider.GetService<ApplicationDbContext>();

            dbContext.Set<Product>().AddRange([
                    new Product {
                        Id = 1,
                        Name = "Üvegpohár",
                        Price = 1200,
                        Description = "Vastagfalú üvegpohár"
                    },
                    new Product {
                        Id = 2,
                        Name = "Ugrálókötél",
                        Price = 3200,
                        Description = "Gumi ugrálókötél"
                    },
                    new Product {
                        Id = 3,
                        Name = "Gamer billentyűzet",
                        Price = 12300,
                        Description = "Mechanikus gamer billentyűzet"
                    },
                    new Product {
                        Id = 4,
                        Name = "Macbook Pro 2019",
                        Price = 340000,
                        Description = "Good macbook pro",
                    }
                ]);

            await dbContext.SaveChangesAsync();
        }
    }
}
