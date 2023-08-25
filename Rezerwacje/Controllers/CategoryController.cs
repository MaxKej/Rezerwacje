using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Model;

[ApiController]
[Route("api/category")]
public class CategoryController : ControllerBase
{
    private readonly IDbContextFactory<AppDbContext> _contextFactory;

    public CategoryController(IDbContextFactory<AppDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    [HttpPost("save")]
    public async Task<IActionResult> SaveCategory([FromBody] Category category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        using (var context = _contextFactory.CreateDbContext())
        {
            context.Categories.Add(category);
            await context.SaveChangesAsync();
        }
        return Ok();
    }


    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var category = await context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            context.Categories.Remove(category);
            await context.SaveChangesAsync();
        }
        return Ok();
    }
    [HttpGet("get/{id}")]
    public async Task<ActionResult<Category>> GetCategory(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var category = await context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            return category;
        }
    }

    [HttpGet("getAll")]
    public ActionResult<IEnumerable<Category>> GetAllCategories()
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var categories = context.Categories.ToList();
            return categories;
        }
    }
}