using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Model;
using Rezerwacje.Areas.Identity.Data;
using Rezerwacje.Data;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContextFactory<AppDbContext>(options => options.UseSqlServer(connectionString), ServiceLifetime.Transient);

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AuthDbContext>();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddDbContext<AuthDbContext>(options => options.UseSqlServer(connectionString), ServiceLifetime.Transient);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

using var scope = app.Services.CreateScope();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

var userEmail = "Admin@example.com";
var user = await userManager.FindByEmailAsync(userEmail);

if (user != null)
{
    var roleExists = await roleManager.RoleExistsAsync("Admin");
    if (!roleExists)
    {
        // Create the "Admin" role if it doesn't exist
        await roleManager.CreateAsync(new IdentityRole("Admin"));
    }

    // Add the "Admin" role to the user
    await userManager.AddToRoleAsync(user, "Admin");
}

//if (user != null)
//{
//    var isAdmin = await userManager.IsInRoleAsync(user, "Admin"); // Check if the user is in the "Admin" role

//    if (isAdmin)
//    {
//        Console.WriteLine("The user is an administrator.");
//    }
//    else
//    {
//        Console.WriteLine("The user is not an administrator.");
//    }
//}
//else
//{
//    Console.WriteLine("User not found.");
//}


app.Run();
