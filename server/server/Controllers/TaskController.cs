using Microsoft.AspNetCore.Mvc;
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
            if (id != task.ID)
                return BadRequest();

            _context.Tasks.Update(task);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            _context.SaveChanges();
            return NoContent();
        }
    }

}