

### Backend Documentation

#### Project Overview:
The backend serves as an API for a task management system. It handles CRUD operations for tasks and user authentication.

#### Technology Stack:
- **Framework:** .NET Core
- **Database:** SQL Server
- **ORM:** Dapper 

#### Setup Instructions:
1. **Prerequisites:**
   - .NET Core SDK (version specified)
   - SQL Server (LocalDB or a full instance)
   - Visual Studio or another compatible IDE

2. **Database Setup:**
   - Connect to your SQL Server instance using SQL Server Management Studio or another database tool.
   - Run the provided SQL migration script to create and populate the `Tasks` table.

3. **Connection String Configuration:**
   - Locate the `appsettings.json` file in your project directory.
   - Replace the placeholder in the `DefaultConnection` string with your actual server name:
     ```json
     {
       "ConnectionStrings": {
         "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=TaskManagement;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;"
       }
     }
     ```

4. **Running the API:**
   - Open the solution in Visual Studio.
   - Build the solution to restore NuGet packages and compile the project.
   - Run the project using IIS Express or Kestrel.

5. **API Endpoints:**
   - List all tasks: `GET /api/Tasks`
   - Get a specific task by ID: `GET /api/Tasks/{id}`
   - Create a new task: `POST /api/Tasks`
   - Update a task: `PUT /api/Tasks/{id}`
   - Delete a task: `DELETE /api/Tasks/{id}`
   - User login: `POST /api/Tasks/login`
   - User registration: `POST /api/Tasks/register`

#### Testing:
- Use Postman or another API client to test the API endpoints.
- Ensure to handle different response statuses like 200, 404, 500, etc.

### Frontend Documentation

#### Project Overview:
The frontend is an Angular application that provides a user interface for managing tasks, including features to add, delete, update, and view tasks.

#### Technology Stack:
- **Framework:** Angular
- **Styling:** CSS, Bootstrap (if used)

#### Setup Instructions:
1. **Prerequisites:**
   - Node.js and npm installed
   - Angular CLI installed

2. **Installation:**
   - Navigate to the project directory in a terminal.
   - Run `npm install` to install dependencies.

3. **Running the Application:**
   - Execute `ng serve` from the command line.
   - Access the application by navigating to `http://localhost:4200/` in a web browser.

4. **Key Components:**
   - DashboardComponent: Displays all tasks and allows user interaction.
   - TaskDetailComponent: Allows viewing and editing specific task details.
   - LoginComponent and SignUpComponent: Handle user authentication and registration.

5. **Configuration:**
   - Ensure that the API URL in the Angular service matches the URL of the backend API.

#### Testing:
- Use Angular's built-in testing tools like Jasmine and Karma for unit testing.
- Consider end-to-end testing with Protractor.

### Additional Notes:
- **Version Control:** Use Git for version control.
- **Deployment:** Include instructions for deploying both the frontend and backend, possibly using platforms like Azure, AWS, or Heroku.

This documentation provides a structured way to understand and interact with both the backend and frontend components of your project, making it easier for new developers or teams to get up to speed. Adjust the level of detail based on the complexity of your project and the needs of your team.