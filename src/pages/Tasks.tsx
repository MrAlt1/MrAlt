import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  project: string;
}

const Tasks: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design Homepage', status: 'in-progress', priority: 'high', project: 'Website Redesign' },
    { id: 2, title: 'API Documentation', status: 'completed', priority: 'medium', project: 'API Integration' },
    { id: 3, title: 'Database Schema', status: 'todo', priority: 'high', project: 'Database Migration' },
    { id: 4, title: 'User Authentication', status: 'in-progress', priority: 'medium', project: 'Mobile App Development' },
  ]);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    status: 'todo',
    priority: 'medium',
    project: '',
  });

  const handleOpen = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setNewTask({
        title: task.title,
        status: task.status,
        priority: task.priority,
        project: task.project,
      });
    } else {
      setEditingTask(null);
      setNewTask({
        title: '',
        status: 'todo',
        priority: 'medium',
        project: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
    setNewTask({
      title: '',
      status: 'todo',
      priority: 'medium',
      project: '',
    });
  };

  const handleSave = () => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...newTask, id: editingTask.id }
          : task
      ));
    } else {
      const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
      setTasks([...tasks, { ...newTask, id: newId }]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return '#2196f3';
      case 'completed':
        return '#4caf50';
      case 'todo':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#666';
    }
  };

  return (
    <Box 
      sx={{ 
        p: 3, 
        color: 'white',
        animation: 'fadeIn 0.5s ease-in-out',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            animation: 'slideDown 0.5s ease-in-out',
            animationDelay: '0.1s',
            animationFillMode: 'both',
          }}
        >
          Tasks
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            animation: 'slideDown 0.5s ease-in-out',
            animationDelay: '0.2s',
            animationFillMode: 'both',
          }}
        >
          Add Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        {tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Paper
              sx={{
                p: 2,
                animation: 'slideUp 0.5s ease-in-out',
                animationDelay: `${0.3 + index * 0.1}s`,
                animationFillMode: 'both',
                backgroundColor: '#242424',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
                <Typography variant="h6">{task.title}</Typography>
                <Box
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: `${getStatusColor(task.status)}20`,
                    color: getStatusColor(task.status),
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {task.status}
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Project: {task.project}
              </Typography>
              <Box
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  backgroundColor: `${getPriorityColor(task.priority)}20`,
                  color: getPriorityColor(task.priority),
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  mb: 2,
                }}
              >
                {task.priority} priority
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  variant="outlined"
                  sx={{ color: '#646cff', borderColor: '#646cff' }}
                  onClick={() => handleOpen(task)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  sx={{ color: '#f44336', borderColor: '#f44336' }}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#242424',
            color: 'white',
            animation: 'slideUp 0.5s ease-in-out',
          }
        }}
      >
        <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Project</InputLabel>
            <Select 
              label="Project"
              value={newTask.project}
              onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
            >
              <MenuItem value="Website Redesign">Website Redesign</MenuItem>
              <MenuItem value="Mobile App Development">Mobile App Development</MenuItem>
              <MenuItem value="Database Migration">Database Migration</MenuItem>
              <MenuItem value="API Integration">API Integration</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select 
              label="Status"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task['status'] })}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select 
              label="Priority"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#fff' }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            {editingTask ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks; 