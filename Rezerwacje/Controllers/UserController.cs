using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Rezerwacje.Areas.Identity.Data;

namespace Rezerwacje.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("get/username")]
        public async Task<IActionResult> GetUsername()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);

            if (user != null)
            {
                return Ok(user.UserName);
            }

            return NotFound();
        }

        [HttpGet("get/userid")]
        public async Task<IActionResult> GetUserId()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);

            if (user != null)
            {
                return Ok(user.Id);
            }

            return NotFound();
        }
    }
}