using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository.Data;
using Repository.Models;

namespace server.Controllers
{



    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TaskModal>> Get()
        {
            try
            {
                return _context.Tasks.ToList();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
           
        }

        [HttpGet("{id}")]
        public ActionResult<TaskModal> Get(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null)
                return NotFound();

            return task;
        }

        [HttpPost]
        public ActionResult<TaskModal> Post([FromBody] TaskModal task)
        {
            try
            {
                _context.Tasks.Add(task);
                _context.SaveChanges();
                return CreatedAtAction(nameof(Get), new { id = task.ID }, task);
            } 
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] TaskModal task)
        {
            try
            {
                var existingTask = _context.Tasks.Find(id);
                if (existingTask == null)
                    return NotFound("Task not found");

                if (id != task.ID)
                    return BadRequest("Task ID mismatch");

                _context.Entry(existingTask).CurrentValues.SetValues(task);
                _context.SaveChanges();

                return Ok(existingTask);
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, $"Database update error: {dbEx.Message}");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An error occurred: {e.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var task = _context.Tasks.Find(id);
                if (task == null)
                    return NotFound($"Task with ID {id} not found");

                _context.Tasks.Remove(task);
                _context.SaveChanges();

                return NoContent();
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, $"Database update error: {dbEx.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }

}