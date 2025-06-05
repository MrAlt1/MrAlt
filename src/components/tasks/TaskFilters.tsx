import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { colors } from '../../theme';

interface TaskFiltersProps {
  onFilterChange: (filters: {
    search: string;
    status: string;
    priority: string;
    project: string;
  }) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    search: '',
    status: '',
    priority: '',
    project: '',
  });

  const handleChange = (field: string) => (event: any) => {
    const newFilters = {
      ...filters,
      [field]: event.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        backgroundColor: colors.background.card,
        animation: 'slideDown 0.5s ease-in-out',
        animationDelay: '0.3s',
        animationFillMode: 'both',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search tasks..."
            value={filters.search}
            onChange={handleChange('search')}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: colors.text.secondary, mr: 1 }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors.background.paper,
                '& fieldset': {
                  borderColor: colors.border.default,
                },
                '&:hover fieldset': {
                  borderColor: colors.border.light,
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.primary.main,
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={handleChange('status')}
              sx={{
                backgroundColor: colors.background.paper,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.border.default,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.border.light,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.primary.main,
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={filters.priority}
              label="Priority"
              onChange={handleChange('priority')}
              sx={{
                backgroundColor: colors.background.paper,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.border.default,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.border.light,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.primary.main,
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Project</InputLabel>
            <Select
              value={filters.project}
              label="Project"
              onChange={handleChange('project')}
              sx={{
                backgroundColor: colors.background.paper,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.border.default,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.border.light,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.primary.main,
                },
              }}
            >
              <MenuItem value="">All Projects</MenuItem>
              <MenuItem value="Website Redesign">Website Redesign</MenuItem>
              <MenuItem value="Mobile App Development">Mobile App Development</MenuItem>
              <MenuItem value="Database Migration">Database Migration</MenuItem>
              <MenuItem value="API Integration">API Integration</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaskFilters; 