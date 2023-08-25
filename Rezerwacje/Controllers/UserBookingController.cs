using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Model;

[ApiController]
[Route("api/userbooking")]
public class UserBookingController : ControllerBase
{
    private readonly IDbContextFactory<AppDbContext> _contextFactory;

    public UserBookingController(IDbContextFactory<AppDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    [HttpPost("save")]
    public async Task<IActionResult> SaveUserBooking([FromBody] UserBooking userbooking)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.UserBookings.Add(userbooking);
            await context.SaveChangesAsync();
        }
        return Ok();
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUserBooking(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var userbooking = await context.UserBookings.FindAsync(id);
            if (userbooking == null)
                return NotFound();

            context.UserBookings.Remove(userbooking);
            await context.SaveChangesAsync();
        }
        return Ok();
    }
    [HttpGet("get/{id}")]
    public async Task<ActionResult<UserBooking>> GetUserBooking(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var userbooking = await context.UserBookings.FindAsync(id);
            if (userbooking == null)
                return NotFound();

            return userbooking;
        }
    }

    [HttpGet("getAll")]
    public ActionResult<IEnumerable<UserBooking>> GetAllUserBookings()
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var userbookings = context.UserBookings.ToList();
            return userbookings;
        }
    }
}