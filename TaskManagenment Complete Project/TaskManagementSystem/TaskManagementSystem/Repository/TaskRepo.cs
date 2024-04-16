using Dapper;
using System.Data.SqlClient;
using TaskManagementSystem.DTO;

namespace TaskManagementSystem.Repository
{
    public class TaskRepo : ITaskRepo
    {
        private readonly string _connectionString;
        private static List<UserDto> _users = new List<UserDto>
        {
            new UserDto { UserId = 1, UserName = "user1", Password = "password1", Location = "Location1", ContactNumber = "000-000-0000" },
            new UserDto { UserId = 2, UserName = "user2", Password = "password2", Location = "Location2", ContactNumber = "111-111-1111" }
        };

        public TaskRepo(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public UserDto Login(string userName, string password)
        {
            var user = _users.FirstOrDefault(u => u.UserName == userName && u.Password == password);
            if (user != null)
            {
                return user;  // Login successful
            }
            return null;  // Login failed
        }

        public UserDto SignIn(UserDto newUser)
        {
            if (_users.Any(u => u.UserName == newUser.UserName))
            {
                throw new Exception("Username already exists");
            }

            newUser.UserId = _users.Max(u => u.UserId) + 1;  // Simulate auto-increment
            _users.Add(newUser);
            return newUser;
        }


        public async Task<IEnumerable<TaskDto>> GetAllAsync()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                return await db.QueryAsync<TaskDto>("SELECT * FROM Tasks");
            }
        }

        public async Task<TaskDto> GetByIdAsync(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                return await db.QuerySingleOrDefaultAsync<TaskDto>("SELECT * FROM Tasks WHERE Id = @Id", new { Id = id });
            }
        }

        public async Task AddAsync(TaskDto task)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
INSERT INTO Tasks 
    (Name, Description, Priority, Status, Added, Completed) 
VALUES 
    (@Name, @Description, @Priority, @Status, @Added, @Completed)";

                var parameters = new
                {
                    Name = task.Name,
                    Description = task.Description,
                    Priority = task.Priority,
                    Status = task.Status,
                    Added = DateTime.UtcNow, // Using UTC time for consistency across time zones
                    Completed = (DateTime?)null // Explicitly setting null
                };

                try
                {
                    await db.ExecuteAsync(sql, parameters);
                }
                catch (Exception ex)
                {
                    // Log the error
                    Console.WriteLine($"An error occurred when adding a task: {ex.Message}");
                    throw; // Consider rethrowing or handling the error appropriately
                }
            }
        }



        public async Task UpdateAsync(TaskDto task)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "UPDATE Tasks SET Name = @Name, Description = @Description, Priority = @Priority, Status = @Status, Added = @Added, Completed = @Completed WHERE Id = @Id";
                await db.ExecuteAsync(sql, task);
            }
        }

        public async Task DeleteAsync(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                await db.ExecuteAsync("DELETE FROM Tasks WHERE Id = @Id", new { Id = id });
            }
        }

        public async Task UpdateTaskStatusAsync(int taskId, int newStatus = 2)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "UPDATE Tasks SET Status = @NewStatus WHERE Id = @Id";
                var parameters = new { NewStatus = newStatus, Id = taskId };
                await db.ExecuteAsync(sql, parameters);
            }
        }


    }
}