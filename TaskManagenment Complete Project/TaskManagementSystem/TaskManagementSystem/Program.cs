using TaskManagementSystem.Services;
using TaskManagementSystem.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register your services and repository to the DI container
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddScoped<ITaskRepo>(provider => new TaskRepo(connectionString));
builder.Services.AddScoped<ITaskService, TaskService>();

// Add CORS service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:4200") // Angular app is served from this URL
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();
app.MapControllers();
app.Run();
