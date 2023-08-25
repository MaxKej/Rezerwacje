using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Model.Entities
{
    public class UserBooking
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public String UserName { get; set; }
        public String Description { get; set; }
        public DateTime BeginOfBooking { get; set; }
        public DateTime EndOfBooking { get; set; }
        //public virtual Booking Booking { get; set; }
    }
}
