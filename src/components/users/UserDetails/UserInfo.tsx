import React from 'react';
import { Card } from '../../ui/Card';
import { EquipmentUser } from '../../../types';

interface UserInfoProps {
  user: EquipmentUser;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">User Details</h2>
      </Card.Header>
      <Card.Content>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Department</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.department}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.role}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Access Level</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.accessLevel}</dd>
          </div>
        </dl>
      </Card.Content>
    </Card>
  );
}