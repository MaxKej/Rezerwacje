using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Repository.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace Repository.Concrete
{
    public class BookingRepository : BaseRepository, IBookingRepository
    {
        public BookingRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Booking> GetBookingAsync(int id)
        {
            return await Context.Bookings.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Booking>> GetAllBookingsAsync()
        {
            return await Context.Bookings.ToListAsync();
        }

        public async Task<bool> SaveBookingAsync(Booking booking)
        {
            if (booking == null)
                return false;

            Context.Entry(booking).State = booking.Id == default(int) ? EntityState.Added : EntityState.Modified;

            try
            {
                await Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> DeleteBookingAsync(int id)
        {
            var activity = await GetBookingAsync(id);
            if (activity == null)
                return true;

            Context.Bookings.Remove(activity);

            try
            {
                await Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        
    }
}
