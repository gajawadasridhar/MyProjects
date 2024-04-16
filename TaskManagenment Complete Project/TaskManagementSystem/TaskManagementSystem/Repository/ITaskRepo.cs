using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementSystem.DTO;

namespace TaskManagementSystem.Repository
{
    public interface ITaskRepo
    {
        Task<IEnumerable<TaskDto>> GetAllAsync();

        Task<TaskDto> GetByIdAsync(int id);

        Task AddAsync(TaskDto task);

        Task UpdateAsync(TaskDto task);

        Task DeleteAsync(int id);

        UserDto Login(string userName, string password);

        UserDto SignIn(UserDto newUser);
        
        Task UpdateTaskStatusAsync(int taskId, int newStatus);

    }
}