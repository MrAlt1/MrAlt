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

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  description: string;
}

const Projects: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: 'Website Redesign', status: 'active', description: 'Redesign company website' },
    { id: 2, name: 'Mobile App Development', status: 'active', description: 'Develop new mobile app' },
    { id: 3, name: 'Database Migration', status: 'completed', description: 'Migrate to new database' },
    { id: 4, name: 'API Integration', status: 'on-hold', description: 'Integrate third-party APIs' },
  ]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    status: 'active',
    description: '',
  });

  const handleOpen = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setNewProject({
        name: project.name,
        status: project.status,
        description: project.description,
      });
    } else {
      setEditingProject(null);
      setNewProject({
        name: '',
        status: 'active',
        description: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
    setNewProject({
      name: '',
      status: 'active',
      description: '',
    });
  };

  const handleSave = () => {
    if (editingProject) {
      setProjects(projects.map(project => 
        project.id === editingProject.id 
          ? { ...newProject, id: editingProject.id }
          : project
      ));
    } else {
      const newId = Math.max(...projects.map(p => p.id), 0) + 1;
      setProjects([...projects, { ...newProject, id: newId }]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4caf50';
      case 'completed':
        return '#2196f3';
      case 'on-hold':
        return '#f44336';
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
          Projects
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
          Add Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
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
                <Typography variant="h6">{project.name}</Typography>
                <Box
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: `${getStatusColor(project.status)}20`,
                    color: getStatusColor(project.status),
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.status}
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {project.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  variant="outlined"
                  sx={{ color: '#646cff', borderColor: '#646cff' }}
                  onClick={() => handleOpen(project)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  sx={{ color: '#f44336', borderColor: '#f44336' }}
                  onClick={() => handleDelete(project.id)}
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
        <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select 
              label="Status"
              value={newProject.status}
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project['status'] })}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="on-hold">On Hold</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#fff' }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            {editingProject ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects; 