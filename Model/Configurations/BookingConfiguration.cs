﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjektTNAI.Model.Configurations
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.HasKey(x=> x.Id);
            builder.Property(x => x.Name).HasMaxLength(200);
            //builder.HasOne<Category>(x => x.Category).WithMany(x => x.Bookings).HasForeignKey(x => x.CategoryId);
        }
    }
}
