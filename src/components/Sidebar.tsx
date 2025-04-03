import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  ListItemButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Projects', icon: <AssignmentIcon />, path: '/projects' },
    { text: 'Tasks', icon: <TaskIcon />, path: '/tasks' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#242424',
          color: 'white',
          borderRight: '1px solid #333',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography 
          variant="h6" 
          noWrap 
          component="div"
          sx={{
            color: '#646cff',
            fontWeight: 'bold',
          }}
        >
          PMS
        </Typography>
      </Box>
      <Divider sx={{ borderColor: '#333' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#333',
                  '&:hover': {
                    backgroundColor: '#3a3a3a',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#646cff',
                  },
                  '& .MuiTypography-root': {
                    fontWeight: 'bold',
                  },
                },
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 