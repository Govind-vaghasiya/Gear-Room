import React from 'react';
import { Edit, Trash2, Eye, Package } from 'lucide-react';
import { Button } from '../ui/Button';
import { EquipmentUser } from '../../types';

interface UserListProps {
  users: EquipmentUser[];
  onEdit: (user: EquipmentUser) => void;
  onDelete: (id: string) => void;
  onViewDetails: (user: EquipmentUser) => void;
  onIssueEquipment: (user: EquipmentUser) => void;
}

export function UserList({ users, onEdit, onDelete, onViewDetails, onIssueEquipment }: UserListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Access Level
            </th>
            <th className="px-6 py-3 relative">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewDetails(user)}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.accessLevel}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex space-x-2 justify-end">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onIssueEquipment(user);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Issue Equipment
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(user);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(user.id!);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}