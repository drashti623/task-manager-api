const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// In-memory tasks storage
let tasks = [
  {
    id: 1,
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the task manager API",
    status: "pending",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Review code",
    description: "Review pull requests from team members",
    status: "in-progress",
    createdAt: new Date().toISOString()
  }
];
let nextId = 3;

// Validation middleware
const validateTask = (req, res, next) => {
  const { title, status } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Status must be one of: pending, in-progress, completed' });
  }
  next();
};

// Find task middleware
const findTask = (req, res, next) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  req.task = task;
  next();
};

// Routes
app.get('/api/tasks', (req, res) => {
  const { status } = req.query;
  let filteredTasks = tasks;
  if (status) {
    filteredTasks = tasks.filter(t => t.status === status);
  }
  res.json({ success: true, count: filteredTasks.length, data: filteredTasks });
});

app.get('/api/tasks/:id', findTask, (req, res) => {
  res.json({ success: true, data: req.task });
});

app.post('/api/tasks', validateTask, (req, res) => {
  const { title, description = '', status = 'pending' } = req.body;
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json({ success: true, message: 'Task created successfully', data: newTask });
});

app.put('/api/tasks/:id', findTask, validateTask, (req, res) => {
  const { title, description, status } = req.body;
  if (title) req.task.title = title.trim();
  if (description !== undefined) req.task.description = description.trim();
  if (status) req.task.status = status;
  req.task.updatedAt = new Date().toISOString();
  res.json({ success: true, message: 'Task updated successfully', data: req.task });
});

app.patch('/api/tasks/:id/status', findTask, (req, res) => {
  const { status } = req.body;
  if (!status || !['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Valid status required: pending, in-progress, completed' });
  }
  req.task.status = status;
  req.task.updatedAt = new Date().toISOString();
  res.json({ success: true, message: 'Task status updated successfully', data: req.task });
});

app.delete('/api/tasks/:id', findTask, (req, res) => {
  tasks = tasks.filter(t => t.id !== req.task.id);
  res.json({ success: true, message: 'Task deleted successfully', data: req.task });
});

app.delete('/api/tasks', (req, res) => {
  const count = tasks.length;
  tasks = [];
  nextId = 1;
  res.json({ success: true, message: `${count} tasks deleted successfully` });
});

// 404 handler (for routes not matched)
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handler (any server error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Task Manager API running on port ${PORT}`);
});
