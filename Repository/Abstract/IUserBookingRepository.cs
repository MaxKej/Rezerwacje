using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Abstract
{
    public interface IUserBookingRepository
    {
        Task<UserBooking> GetUserBookingAsync(int id);
        Task<List<UserBooking>> GetAllUserBookingsAsync(String UserId);
        Task<bool> SaveUserBookingAsync(UserBooking userActivity);
        Task<bool> DeleteUserBookingAsync(int id);
    }
}
