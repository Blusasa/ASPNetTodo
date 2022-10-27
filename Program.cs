using Microsoft.EntityFrameworkCore;
using TodoAPI.Models;

var builder = WebApplication.CreateBuilder(args);
var myPolicy = "_MyPolicy";
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>(option => option.UseInMemoryDatabase("TodoList"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => {
    options.AddPolicy(name: myPolicy, 
                       policy => {
                            policy.WithOrigins("http://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                       });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors(myPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
