using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCatalog.Controllers;
using ProductCatalog.Database;
using ProductCatalog.Models.Entities;

namespace UnitTest
{
    public class ProductControllerTests
    {
        private async Task<ApplicationDbContext> GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var dbContext = new ApplicationDbContext(options);
            dbContext.Database.EnsureCreated();

            if(await dbContext.Products.CountAsync() <= 0)
            {
                dbContext.Products.AddRange(
                    new Product
                    {
                        Id = 1,
                        Name = "Üvegpohár",
                        Price = 1200,
                        Description = "Vastagfalú üvegpohár"
                    },
                    new Product
                    {
                        Id = 2,
                        Name = "Ugrálókötél",
                        Price = 3200,
                        Description = "Gumi ugrálókötél"
                    },
                    new Product
                    {
                        Id = 3,
                        Name = "Gamer billentyűzet",
                        Price = 12300,
                        Description = "Mechanikus gamer billentyűzet"
                    },
                    new Product
                    {
                        Id = 4,
                        Name = "Macbook Pro 2019",
                        Price = 340000,
                        Description = "Good macbook pro",
                    }
                );

                await dbContext.SaveChangesAsync();
            }

            return dbContext;
        }

        [Fact]
        public async void GetProduct_ReturnProduct_WhenExists()
        {
            // Arrange
            var dbContext = await GetDatabaseContext();
            var controller = new ProductsController(dbContext);

            var productId = 1;

            // Act
            var product = await controller.GetProduct(productId);

            // Assert
            product.Should().NotBeNull();
            product.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public async void GetProduct_ReturnNotFound_WhenDoesntExists()
        {
            // Arrange
            var dbContext = await GetDatabaseContext();
            var controller = new ProductsController(dbContext);

            var productId = -111;

            // Act
            var result = await controller.GetProduct(productId) as NotFoundResult;

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();
            result.StatusCode.Should().Be(404);
        }


        [Fact]
        public async void GetProducts_ReturnProducts_WhenExists()
        {
            // Arrange
            var dbContext = await GetDatabaseContext();
            var controller = new ProductsController(dbContext);

            // Act
            var products = await controller.GetProducts();

            // Assert
            products.Should().NotBeNull();
            products.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public async void AddProduct_ReturnProduct()
        {
            // Arrange
            var dbContext = await GetDatabaseContext();
            var controller = new ProductsController(dbContext);

            var newProduct = new Product
            {
                Name = "Ablaktörlőlapát",
                Price = 5500,
                Description = "Ablaktörlőlapát leírása",
            };

            // Act
            var product = await controller.PostProduct(newProduct);

            // Assert
            product.Should().NotBeNull();
            product.Should().BeOfType<CreatedAtActionResult>();

            var okResult = product as CreatedAtActionResult;
            var actualProduct = okResult.Value as Product;

            actualProduct.Should().NotBeNull();
        }

        [Fact]
        public async void UpdateProduct_ReturnProduct_WhenProductExists()
        {
            // Arrange
            var dbContext = await GetDatabaseContext();
            var controller = new ProductsController(dbContext);

            var productId = 1;
            var newName = "Törött Üvegpohár";
            var newPrice = 100;
            var newDescription = "Vastagfalú üvegpohár (Törött)";

            var updatingProduct = new Product
            {
                Id = productId,
                Name = newName,
                Price = newPrice,
                Description = newDescription
            };

            // Act 
            var result = await controller.PutProduct(productId, updatingProduct);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NoContentResult>();

            var updatedProduct = await controller.GetProduct(productId);

            var okResult = updatedProduct as OkObjectResult;
            var actualProduct = okResult.Value as Product;

            actualProduct.Should().NotBeNull();
            actualProduct.Name.Should().Be(newName);
            actualProduct.Price.Should().Be(newPrice);
            actualProduct.Description.Should().Be(newDescription);
        }

        [Fact]
        public async void UpdateProduct_ReturnNotFound_WhenNotExists()
        {
            // Arrange
            var dbContext = await GetDatabaseContext();
            var controller = new ProductsController(dbContext);

            var productId = -1;
            var newName = "Törött Üvegpohár";
            var newPrice = 100;
            var newDescription = "Vastagfalú üvegpohár (Törött)";

            var updatingProduct = new Product
            {
                Id = -1,
                Name = newName,
                Price = newPrice,
                Description = newDescription
            };

            // Act
            var result = await controller.PutProduct(productId, updatingProduct);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async void UpdateProduct_ReturnBadRequst_WhenIdsNotMatch()
        {
            // Arrange
            var dbContext = await GetDatabaseContext();
            var controller = new ProductsController(dbContext);

            var productId = -1;
            var newName = "Törött Üvegpohár";
            var newPrice = 100;
            var newDescription = "Vastagfalú üvegpohár (Törött)";

            var updatingProduct = new Product
            {
                Id = 1,
                Name = newName,
                Price = newPrice,
                Description = newDescription
            };

            // Act
            var result = await controller.PutProduct(productId, updatingProduct);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<BadRequestResult>();
        }

        [Fact]
        public async void DeleteProduct_ReturnNoContent_WhenDeleteSuccess()
        {
            // Arrange
            var dbContext = await GetDatabaseContext();
            var controller = new ProductsController(dbContext);

            var productId = 1;

            // Act
            var result = await controller.DeleteProduct(productId);
            
            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NoContentResult>();
        }

        [Fact]
        public async void DeleteProduct_ReturnNotFound_WhenDeletionIdNotFound()
        {
            // Arrange
            var dbContext = await GetDatabaseContext();
            var controller = new ProductsController(dbContext);

            var productId = -1;

            // Act
            var result = await controller.DeleteProduct(productId);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();
        }
    }
}
