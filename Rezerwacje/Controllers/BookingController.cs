using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Model;

[ApiController]
[Route("api/booking")]
public class BookingController : ControllerBase
{
    private readonly IDbContextFactory<AppDbContext> _contextFactory;

    public BookingController(IDbContextFactory<AppDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    [HttpPost("save")]
    public async Task<IActionResult> SaveBooking([FromBody] Booking booking)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.Bookings.Add(booking);
            await context.SaveChangesAsync();
        }
        return Ok();
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteBooking(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var booking = await context.Bookings.FindAsync(id);
            if (booking == null)
                return NotFound();

            context.Bookings.Remove(booking);
            await context.SaveChangesAsync();
        }
        return Ok();
    }
    [HttpGet("get/{id}")]
    public async Task<ActionResult<Booking>> GetBooking(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var booking = await context.Bookings.FindAsync(id);
            if (booking == null)
                return NotFound();

            return booking;
        }
    }

    [HttpGet("getAll")]
    public ActionResult<IEnumerable<Booking>> GetAllBookings()
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var bookings = context.Bookings.ToList();
            return bookings;
        }
    }
}