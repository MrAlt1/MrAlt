import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { colors } from '../theme';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'user',
      status: 'inactive',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
  });

  const handleOpen = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setNewUser({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setNewUser({
        name: '',
        email: '',
        role: 'user',
        status: 'active',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      status: 'active',
    });
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(user =>
        user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user
      ));
    } else {
      const newId = Math.max(...users.map(u => u.id), 0) + 1;
      setUsers([...users, { ...newUser, id: newId }]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
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
          Users
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpen()}
          sx={{
            animation: 'slideDown 0.5s ease-in-out',
            animationDelay: '0.2s',
            animationFillMode: 'both',
          }}
        >
          Add User
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: colors.background.card,
          animation: 'slideUp 0.5s ease-in-out',
          animationDelay: '0.3s',
          animationFillMode: 'both',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{
                  animation: 'slideUp 0.5s ease-in-out',
                  animationDelay: `${0.4 + index * 0.1}s`,
                  animationFillMode: 'both',
                }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    size="small"
                    sx={{
                      backgroundColor: user.role === 'admin' ? colors.status.completed : colors.status.inProgress,
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      backgroundColor: user.status === 'active' ? colors.status.completed : colors.status.todo,
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleOpen(user)}
                    sx={{ color: colors.primary.main }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(user.id)}
                    sx={{ color: colors.priority.high }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: colors.background.dialog,
            color: 'white',
            animation: 'slideUp 0.5s ease-in-out',
          }
        }}
      >
        <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: colors.text.primary }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            {editingUser ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users; 