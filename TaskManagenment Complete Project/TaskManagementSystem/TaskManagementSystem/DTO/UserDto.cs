namespace TaskManagementSystem.DTO
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }  // In a real application, this should be hashed
        public string Location { get; set; }
        public string ContactNumber { get; set; }
    }
}
