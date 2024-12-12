import { useState, useEffect } from 'react';
import { usersService } from '../../lib/services/users/users.service';
import { UserDocument, CreateUserData, UpdateUserData } from '../../lib/services/users/types';
import { toast } from 'react-hot-toast';

export function useUsers() {
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const response = await usersService.getAll();
      if (response.success && response.data) {
        setUsers(response.data);
      } else if (response.error) {
        throw response.error;
      }
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  async function createUser(userData: CreateUserData) {
    try {
      const response = await usersService.create(userData);
      if (response.success && response.data) {
        setUsers(prev => [...prev, response.data]);
        toast.success('User created successfully');
        return response.data;
      } else if (response.error) {
        throw response.error;
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Failed to create user');
      throw error;
    }
  }

  async function updateUser(id: string, userData: UpdateUserData) {
    try {
      const response = await usersService.update(id, userData);
      if (response.success) {
        setUsers(prev => prev.map(user => 
          user.id === id ? { ...user, ...userData } : user
        ));
        toast.success('User updated successfully');
      } else if (response.error) {
        throw response.error;
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Failed to update user');
      throw error;
    }
  }

  async function deleteUser(id: string) {
    try {
      const response = await usersService.delete(id);
      if (response.success) {
        setUsers(prev => prev.filter(user => user.id !== id));
        toast.success('User deleted successfully');
      } else if (response.error) {
        throw response.error;
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Failed to delete user');
      throw error;
    }
  }

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refresh: loadUsers
  };
}