import React, { useState, useEffect } from 'react';
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
  TextField as MuiTextField,
  InputAdornment,
  Pagination,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  project: string;
  dueDate: Date;
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskFilters {
  status: string[];
  priority: string[];
  project: string[];
  search: string;
  sortBy: 'dueDate' | 'priority' | 'status' | 'title';
  sortOrder: 'asc' | 'desc';
}

const Tasks: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<TaskFilters>({
    status: [],
    priority: [],
    project: [],
    search: '',
    sortBy: 'dueDate',
    sortOrder: 'asc',
  });
  const itemsPerPage = 9;

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    project: '',
    dueDate: new Date(),
    assignee: '',
  });

  useEffect(() => {
    fetchTasks();
  }, [page, filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await api.getTasks({ page, filters });
      // setTasks(response.data);
      
      // Temporary mock data
      setTasks([
        {
          id: 1,
          title: 'Design Homepage',
          description: 'Create new homepage design with modern UI elements',
          status: 'in-progress',
          priority: 'high',
          project: 'Website Redesign',
          dueDate: new Date('2024-03-20'),
          assignee: 'John Doe',
          createdAt: new Date('2024-03-01'),
          updatedAt: new Date('2024-03-15'),
        },
        // ... more mock tasks
      ]);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof TaskFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('search', event.target.value);
  };

  const handleSort = (field: TaskFilters['sortBy']) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         task.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status.length === 0 || filters.status.includes(task.status);
    const matchesPriority = filters.priority.length === 0 || filters.priority.includes(task.priority);
    const matchesProject = filters.project.length === 0 || filters.project.includes(task.project);
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const order = filters.sortOrder === 'asc' ? 1 : -1;
    switch (filters.sortBy) {
      case 'dueDate':
        return (a.dueDate.getTime() - b.dueDate.getTime()) * order;
      case 'priority':
        return (getPriorityWeight(a.priority) - getPriorityWeight(b.priority)) * order;
      case 'status':
        return a.status.localeCompare(b.status) * order;
      case 'title':
        return a.title.localeCompare(b.title) * order;
      default:
        return 0;
    }
  });

  const paginatedTasks = sortedTasks.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getPriorityWeight = (priority: string) => {
    switch (priority) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const handleOpen = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setNewTask({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        project: task.project,
        dueDate: task.dueDate,
        assignee: task.assignee,
      });
    } else {
      setEditingTask(null);
      setNewTask({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        project: '',
        dueDate: new Date(),
        assignee: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      project: '',
      dueDate: new Date(),
      assignee: '',
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

      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#242424' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <MuiTextField
              fullWidth
              placeholder="Search tasks..."
              value={filters.search}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  multiple
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="todo">To Do</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  multiple
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>

              <Tooltip title="Sort by Due Date">
                <IconButton
                  onClick={() => handleSort('dueDate')}
                  color={filters.sortBy === 'dueDate' ? 'primary' : 'default'}
                >
                  <SortIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Paper
                  sx={{
                    p: 2,
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{task.title}</Typography>
                    <Chip
                      label={task.status}
                      size="small"
                      sx={{
                        backgroundColor: `${getStatusColor(task.status)}20`,
                        color: getStatusColor(task.status),
                      }}
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {task.description}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Project: {task.project}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Due: {task.dueDate.toLocaleDateString()}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Assignee: {task.assignee}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      variant="outlined"
                      onClick={() => handleOpen(task)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(filteredTasks.length / itemsPerPage)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#242424',
            color: 'white',
          }
        }}
      >
        <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task['status'] })}
                >
                  <MenuItem value="todo">To Do</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project"
                value={newTask.project}
                onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Assignee"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  value={newTask.dueDate}
                  onChange={(date) => setNewTask({ ...newTask, dueDate: date || new Date() })}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks; 