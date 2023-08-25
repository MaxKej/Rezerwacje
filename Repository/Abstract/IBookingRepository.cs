using Model.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Abstract
{
    public interface IBookingRepository
    {
        Task<Booking> GetBookingAsync(int id);
        Task<List<Booking>> GetAllBookingsAsync();
        Task<bool> SaveBookingAsync(Booking booking);
        Task<bool> DeleteBookingAsync(int id);
    }
}
