import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { colors } from '../../theme';

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  project: string;
  dueDate?: string;
}

interface TaskCalendarProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks, onTaskClick }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getTasksForDay = (day: number) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'in-progress':
        return colors.status.inProgress;
      case 'completed':
        return colors.status.completed;
      case 'todo':
        return colors.status.todo;
      default:
        return '#666';
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <Grid xs={1} key={`empty-${i}`}>
          <Box sx={{ height: '100px' }} />
        </Grid>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTasks = getTasksForDay(day);
      days.push(
        <Grid xs={1} key={day}>
          <Paper
            sx={{
              p: 1,
              height: '100px',
              backgroundColor: colors.background.card,
              border: '1px solid',
              borderColor: colors.border.default,
              '&:hover': {
                borderColor: colors.primary.main,
              },
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              {day}
            </Typography>
            {dayTasks.map(task => (
              <Tooltip key={task.id} title={task.title}>
                <Box
                  onClick={() => onTaskClick(task)}
                  sx={{
                    p: 0.5,
                    mb: 0.5,
                    borderRadius: 1,
                    backgroundColor: `${getStatusColor(task.status)}20`,
                    color: getStatusColor(task.status),
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: `${getStatusColor(task.status)}30`,
                    },
                  }}
                >
                  {task.title}
                </Box>
              </Tooltip>
            ))}
          </Paper>
        </Grid>
      );
    }

    return days;
  };

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: colors.background.card,
        animation: 'slideUp 0.5s ease-in-out',
        animationDelay: '0.4s',
        animationFillMode: 'both',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handlePrevMonth} sx={{ color: colors.text.primary }}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography>
        <IconButton onClick={handleNextMonth} sx={{ color: colors.text.primary }}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid xs={1} key={day}>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: 'center',
                color: colors.text.secondary,
                mb: 1,
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
        {renderCalendar()}
      </Grid>
    </Paper>
  );
};

export default TaskCalendar; 