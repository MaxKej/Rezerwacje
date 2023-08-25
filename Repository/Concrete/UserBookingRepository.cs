using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Model;
using Repository.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Concrete
{
    public class UserBookingRepository : BaseRepository, IUserBookingRepository
    {

        public UserBookingRepository(AppDbContext context) : base(context) { }

        public async Task<UserBooking> GetUserBookingAsync(int id)
        {
            return await Context.UserBookings.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<UserBooking>> GetAllUserBookingsAsync(string UserName)
        {         
            return await Context.UserBookings.Where(x => x.UserName == UserName).ToListAsync();
        }

        public async Task<bool> SaveUserBookingAsync(UserBooking userBooking)
        {
            if (userBooking == null)
                return false;

            Context.Entry(userBooking).State = userBooking.Id == default(int) ? EntityState.Added : EntityState.Modified;

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

        public async Task<bool> DeleteUserBookingAsync(int id)
        {
            var userBooking = await GetUserBookingAsync(id);
            if (userBooking == null)
                return true;

            Context.UserBookings.Remove(userBooking);

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
