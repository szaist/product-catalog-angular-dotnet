using ProductCatalog.Database;

namespace ProductCatalog
{
    public static class DependencyInjectionExtension
    {
        public static IServiceProvider InsertFakeData(this IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var faker = scope.ServiceProvider.GetService<DbContextFaker>();

                faker.InsertFakeData().GetAwaiter().GetResult();
            }

            return serviceProvider;
        }
    }
}
