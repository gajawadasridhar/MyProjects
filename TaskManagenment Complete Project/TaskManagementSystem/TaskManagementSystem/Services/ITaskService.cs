using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementSystem.DTO;

namespace TaskManagementSystem.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllTasksAsync();

        Task<TaskDto> GetTaskByIdAsync(int id);

        Task AddTaskAsync(TaskDto task);

        Task UpdateTaskAsync(TaskDto task);

        Task DeleteTaskAsync(int id);

        UserDto SignIn(UserDto newUser);

        UserDto Login(string userName, string password);

        Task UpdateTaskStatusAsync(int taskId, int newStatus);
    }
}