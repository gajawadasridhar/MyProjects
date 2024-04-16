using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementSystem.DTO;
using TaskManagementSystem.Repository;

namespace TaskManagementSystem.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepo _taskRepo;

        public TaskService(ITaskRepo taskRepo)
        {
            _taskRepo = taskRepo;
        }

        public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
        {
            return await _taskRepo.GetAllAsync();
        }

        public async Task<TaskDto> GetTaskByIdAsync(int id)
        {
            return await _taskRepo.GetByIdAsync(id);
        }

        public async Task AddTaskAsync(TaskDto task)
        {
            await _taskRepo.AddAsync(task);
        }

        public async Task UpdateTaskAsync(TaskDto task)
        {
            await _taskRepo.UpdateAsync(task);
        }

        public async Task DeleteTaskAsync(int id)
        {
            await _taskRepo.DeleteAsync(id);
        }

        public UserDto Login(string userName, string password)
        {
            return _taskRepo.Login(userName, password);
        }

        public UserDto SignIn(UserDto newUser)
        {
            return _taskRepo.SignIn(newUser);
        }

        public async Task UpdateTaskStatusAsync(int taskId, int newStatus)
        {
            await _taskRepo.UpdateTaskStatusAsync(taskId, newStatus);
        }
    }
}