using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<UserBooking> UserBookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().HasData(
                new Category
                {
                    Id = 1,
                    Name = "Zajęcia",
                },
                new Category
                {
                    Id = 2,
                    Name = "Rezerwacja - pracownik",
                },
                new Category
                {
                    Id = 3,
                    Name = "Rezerwacja - student",
                }
            );
            modelBuilder.Entity<Booking>().HasData(
            new Booking
            {
                Id = 1,
                Name = "Zajęcia",
                CategoryId = 1,
            },
            new Booking
            {
                Id = 2,
                Name = "Cała sala - pracownik",
                CategoryId = 2,
            },
            new Booking
            {
                Id = 3,
                Name = "Cała sala - student",
                CategoryId = 3,
            },
            new Booking
            {
                Id = 4,
                Name = "Rzutnik i wybrane stanowiska - pracownik",
                CategoryId = 2,
            },
            new Booking
            {
                Id = 5,
                Name = "Rzutnik i wybrane stanowiska - student",
                CategoryId = 3,
            }
        );

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "User", NormalizedName = "USER", Id = Guid.NewGuid().ToString(), ConcurrencyStamp = Guid.NewGuid().ToString() });
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "Admin", NormalizedName = "ADMIN", Id = Guid.NewGuid().ToString(), ConcurrencyStamp = Guid.NewGuid().ToString() });

        }

        public static AppDbContext Create()
        {
            return new AppDbContext(new DbContextOptionsBuilder<AppDbContext>().Options);
        }

    }
}
