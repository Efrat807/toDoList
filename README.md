# To Do List

## 📌 Description
web application to manage tasks.

A full-stack **To Do List** application built using:  
- **client:** React with TypeScript  
- **server:** .NET Core with Entity Framework  
- **Database:** SQLite  

---

## 🚀 Features

- **CRUD Operations for Tasks**
  - Create a new task
  - Update an existing task
  - Delete a task
  - Get all tasks  

- **Tech Stack**
  - React (TypeScript) for client  
  - .NET Core (C#) for server  
  - Entity Framework (EF Core) for database management  
  - SQLite as the database  

---

## 📌 Database Model (Task)

| Field       | Type      | Description          |
|------------|----------|----------------------|
| `id`       | `number`  | Unique Task ID      |
| `description` | `string`  | Task details       |
| `isCompleted` | `boolean` | Task status       |

---

## 📡 API Endpoints

| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| `GET`  | `/api/Task`    | Get all tasks       |
| `POST` | `/api/Task`    | Create a new task   |
| `PUT`  | `/api/Task/{id}` | Update a task      |
| `DELETE` | `/api/Task/{id}` | Delete a task  |

---

## 🛠️ Installation & Setup

**Clone the Repository:**  
clone from git: https://github.com/Efrat807/toDoList/tree/master 

**for client**  
using vs code and navigate to client folder:
```sh
cd client
```
then install dependencies: 
```
npm i
```

start client:
```
npm run dev
```

**for server**  
- install visual studio 2022  
- press on sln file in server folder  
- and run  

**DataBase**  
if there is no DB it will build it automatically  


## 📄 License  
This project is open-source and available under the MIT License.
