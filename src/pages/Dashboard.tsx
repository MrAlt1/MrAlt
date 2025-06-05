import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress, Alert, IconButton } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DashboardData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overdueTasks: number;
  projectProgress: Array<{
    name: string;
    progress: number;
  }>;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Replace with actual API call
      // const response = await api.getDashboardData(startDate, endDate);
      // setData(response.data);
      
      // Temporary mock data
      setData({
        totalProjects: 12,
        activeProjects: 8,
        completedProjects: 4,
        overdueTasks: 5,
        projectProgress: [
          { name: 'Project A', progress: 75 },
          { name: 'Project B', progress: 45 },
          { name: 'Project C', progress: 90 },
          { name: 'Project D', progress: 30 },
        ],
      });
    } catch (err) {
      setError('Failed to fetch dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [startDate, endDate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button onClick={fetchDashboardData} startIcon={<RefreshIcon />}>
          Retry
        </Button>
      </Box>
    );
  }

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
          gutterBottom 
          sx={{ 
            animation: 'slideDown 0.5s ease-in-out',
            animationDelay: '0.1s',
            animationFillMode: 'both',
          }}
        >
          Dashboard Overview
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ backgroundColor: '#242424', borderRadius: 1 }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{ backgroundColor: '#242424', borderRadius: 1 }}
            />
          </LocalizationProvider>
          <IconButton onClick={fetchDashboardData} sx={{ color: 'white' }}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
        gap: 3,
        mb: 4
      }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            animation: 'slideUp 0.5s ease-in-out',
            animationDelay: '0.2s',
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <DashboardIcon sx={{ color: '#646cff', mr: 1 }} />
            <Typography variant="h6" component="div">
              Total Projects
            </Typography>
          </Box>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            12
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            animation: 'slideUp 0.5s ease-in-out',
            animationDelay: '0.3s',
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AssignmentIcon sx={{ color: '#4caf50', mr: 1 }} />
            <Typography variant="h6" component="div">
              Active Projects
            </Typography>
          </Box>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            8
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            animation: 'slideUp 0.5s ease-in-out',
            animationDelay: '0.4s',
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircleIcon sx={{ color: '#2196f3', mr: 1 }} />
            <Typography variant="h6" component="div">
              Completed Projects
            </Typography>
          </Box>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            4
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            animation: 'slideUp 0.5s ease-in-out',
            animationDelay: '0.5s',
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WarningIcon sx={{ color: '#f44336', mr: 1 }} />
            <Typography variant="h6" component="div">
              Overdue Tasks
            </Typography>
          </Box>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            5
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            mb: 3, 
            animation: 'slideDown 0.5s ease-in-out',
            animationDelay: '0.6s',
            animationFillMode: 'both',
          }}
        >
          Project Progress
        </Typography>
        <Paper
          sx={{
            p: 3,
            height: 400,
            animation: 'slideUp 0.5s ease-in-out',
            animationDelay: '0.7s',
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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.projectProgress || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#242424',
                  border: '1px solid #333',
                  color: '#fff',
                }}
              />
              <Bar dataKey="progress" fill="#646cff" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 