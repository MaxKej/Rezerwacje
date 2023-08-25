using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjektTNAI.Model.Configurations
{
    public class UserBookingConfiguration : IEntityTypeConfiguration<UserBooking>
    {
        public void Configure(EntityTypeBuilder<UserBooking> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.BeginOfBooking).IsRequired();
            builder.Property(x => x.EndOfBooking).IsRequired();
            builder.Property(x=> x.UserName).IsRequired();
            //builder.HasOne<Booking>(x => x.Booking).WithMany(x => x.UserBookings).HasForeignKey(x=>x.BookingId);
        }
    }
}
