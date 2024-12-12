import { useState, useEffect } from 'react';
import { usersService } from '../lib/services/users.service';
import { EquipmentUser } from '../types';
import { toast } from 'react-hot-toast';

export function useUsers() {
  const [users, setUsers] = useState<EquipmentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await usersService.getAll();
      setUsers(data);
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  async function createUser(userData: Omit<EquipmentUser, 'id'>) {
    try {
      const newUser = await usersService.create(userData);
      setUsers(prev => [...prev, newUser]);
      toast.success('User created successfully');
      return newUser;
    } catch (err) {
      const error = err as Error;
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
      throw error;
    }
  }

  async function updateUser(id: string, userData: Partial<Omit<EquipmentUser, 'id'>>) {
    try {
      await usersService.update(id, userData);
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, ...userData } : user
      ));
      toast.success('User updated successfully');
    } catch (err) {
      const error = err as Error;
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
      throw error;
    }
  }

  async function deleteUser(id: string) {
    try {
      await usersService.delete(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    } catch (err) {
      const error = err as Error;
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
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