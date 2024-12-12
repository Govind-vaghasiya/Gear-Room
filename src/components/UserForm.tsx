import React, { useState } from 'react';
import { Button } from './ui/Button';
import { UserDocument } from '../lib/services/users/types';
import { toast } from 'react-hot-toast';

interface UserFormProps {
  onSubmit: (data: Partial<Omit<UserDocument, 'id'>>) => Promise<void>;
  initialData?: UserDocument;
  onCancel: () => void;
}

export function UserForm({ onSubmit, initialData, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    department: initialData?.department || '',
    role: initialData?.role || '',
    accessLevel: initialData?.accessLevel || 'basic',
    assignedAssets: initialData?.assignedAssets || [],
    checkoutHistory: initialData?.checkoutHistory || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onCancel();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
        >
          <option value="">Select department...</option>
          <option value="Production">Production</option>
          <option value="Camera">Camera</option>
          <option value="Lighting">Lighting</option>
          <option value="Sound">Sound</option>
        </select>
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="accessLevel">Access Level</label>
        <select
          id="accessLevel"
          value={formData.accessLevel}
          onChange={(e) => setFormData({ ...formData, accessLevel: e.target.value as UserDocument['accessLevel']})}
          required
        >
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Update' : 'Create'} User
        </Button>
      </div>
    </form>
  );
}