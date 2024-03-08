using Microsoft.EntityFrameworkCore;
using ProductCatalog;
using ProductCatalog.Database;

var allowOriginsSpecification = "localhostOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => {
    options.UseInMemoryDatabase(databaseName: "ProductsDb");
    });

builder.Services.AddSingleton<DbContextFaker>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(allowOriginsSpecification, policy =>
    {

        policy.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>())
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.Services.InsertFakeData();
}
app.UseCors(allowOriginsSpecification);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
