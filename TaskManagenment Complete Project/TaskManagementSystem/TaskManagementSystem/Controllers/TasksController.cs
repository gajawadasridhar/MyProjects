using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskManagementSystem.DTO;
using TaskManagementSystem.Services;

namespace TaskManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public class LoginRequest
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        public class RegisterRequest : LoginRequest
        {
            public string Location { get; set; }
            public string ContactNumber { get; set; }
        }

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            // Attempt to retrieve the task by the given ID from the service layer.
            var taskDetails = await _taskService.GetTaskByIdAsync(id);

            // Check if the task was not found.
            if (taskDetails == null)
            {
                return NotFound($"Task with ID {id} not found.");
            }

            // Return the task details if found.
            return Ok(taskDetails);
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskDto task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _taskService.AddTaskAsync(task);
            return Ok();  // Returns an Ok (200) response
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskDto task)
        {
            if (id != task.Id)
            {
                return BadRequest("Task ID mismatch");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingTask = await _taskService.GetTaskByIdAsync(id);
            if (existingTask == null)
            {
                return NotFound($"Task with ID {id} not found.");
            }
            await _taskService.UpdateTaskAsync(task);
            return NoContent();
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound($"Task with ID {id} not found.");
            }
            await _taskService.DeleteTaskAsync(id);
            return NoContent();
        }

        [HttpPost("login")]
        public ActionResult<UserDto> Login([FromBody] LoginRequest request)
        {
            var user = _taskService.Login(request.UserName, request.Password);
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }
            return Ok(user);
        }

        [HttpPost("register")]
        public ActionResult<UserDto> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var newUser = new UserDto
                {
                    UserName = request.UserName,
                    Password = request.Password, // Note: In a real scenario, the password should be hashed
                    Location = request.Location,
                    ContactNumber = request.ContactNumber
                };
                var createdUser = _taskService.SignIn(newUser);
                return CreatedAtAction(nameof(Login), new { username = createdUser.UserName }, createdUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Tasks/update-status/5
        [HttpPost("update-status/{id}")]
        public async Task<IActionResult> UpdateTaskStatus(int id)
        {
            try
            {
                // Call the service to update the task status to hardcoded value 2
                await _taskService.UpdateTaskStatusAsync(id, 2);
                return Ok();
            }
            catch (System.Exception ex)
            {
                // Log the error and return an appropriate error response
                return BadRequest($"Error updating task status: {ex.Message}");
            }
        }
    }
}