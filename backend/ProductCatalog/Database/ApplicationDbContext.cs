using Microsoft.EntityFrameworkCore;
using ProductCatalog.Database.Configurations;
using ProductCatalog.Models.Entities;

namespace ProductCatalog.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ProductConfiguration());
        }
    }
}
