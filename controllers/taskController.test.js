const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Task = require("../models/Task");
const taskController = require("../controllers/taskController");

const app = express();
app.use(express.json());

app.post("/tasks", taskController.createTask);
app.get("/tasks", taskController.getTasks);
app.get("/tasks/:id", taskController.getTaskById);
app.put("/tasks/:id", taskController.updateTask);
app.delete("/tasks/:id", taskController.deleteTask);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Task.deleteMany(); // clean up between tests
});

describe("Task Controller", () => {
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task", date: "2025-09-25" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
    expect(res.body.status).toBe("pending"); // default
  });

  it("should get all tasks", async () => {
    await Task.create({ title: "Task 1", date: "2025-09-25" });
    await Task.create({ title: "Task 2", date: "2025-09-25" });

    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it("should get a task by id", async () => {
    const task = await Task.create({ title: "Find Me", date: "2025-09-25" });
    const res = await request(app).get(`/tasks/${task._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Find Me");
  });

  it("should update a task", async () => {
    const task = await Task.create({ title: "Old", date: "2025-09-25" });
    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .send({ title: "Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated");
  });

  it("should delete a task", async () => {
    const task = await Task.create({ title: "Delete Me", date: "2025-09-25" });
    const res = await request(app).delete(`/tasks/${task._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
  });
});
