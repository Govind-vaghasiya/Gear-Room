import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { UserForm } from '../components/UserForm';
import { UserList } from '../components/users/UserList';
import { UserDetails } from '../components/users/UserDetails/UserDetails';
import { UserFilters } from '../components/users/UserFilters';
import { Plus } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useCheckoutHistory } from '../hooks/useCheckoutHistory';
import { useAssets } from '../hooks/useAssets';
import { EquipmentUser } from '../types';
import { toast } from 'react-hot-toast';

export default function Users() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const { assets } = useAssets();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<EquipmentUser | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    accessLevel: '',
  });

  // Get all checkouts for the selected user
  const { checkouts } = useCheckoutHistory('');

  const filteredUsers = React.useMemo(() => {
    if (!users) return [];
    
    return users.filter((user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !filters.department || user.department === filters.department;
      const matchesAccessLevel = !filters.accessLevel || user.accessLevel === filters.accessLevel;

      return matchesSearch && matchesDepartment && matchesAccessLevel;
    });
  }, [users, searchTerm, filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading users. Please try again later.
      </div>
    );
  }

  if (showDetails && selectedUser) {
    return (
      <UserDetails
        user={selectedUser}
        checkouts={checkouts}
        assets={assets}
        onBack={() => {
          setShowDetails(false);
          setSelectedUser(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-lg font-medium">Equipment Users</h2>
            <Button onClick={() => setShowModal(true)} variant="primary">
              <Plus size={20} className="mr-2" />
              Add User
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          <UserFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFilterChange={setFilters}
          />
          <UserList
            users={filteredUsers}
            onEdit={(user) => {
              setSelectedUser(user);
              setShowModal(true);
            }}
            onDelete={deleteUser}
            onViewDetails={(user) => {
              setSelectedUser(user);
              setShowDetails(true);
            }}
            onIssueEquipment={(user) => {
              setSelectedUser(user);
              setShowDetails(true);
            }}
          />
        </Card.Content>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedUser(null);
        }}
        title={selectedUser ? 'Edit User' : 'Add New User'}
      >
        <UserForm
          onSubmit={async (data) => {
            try {
              if (selectedUser) {
                await updateUser(selectedUser.id!, data);
              } else {
                await createUser(data);
              }
              setShowModal(false);
              setSelectedUser(null);
            } catch (error) {
              console.error('Error saving user:', error);
              toast.error('Failed to save user');
            }
          }}
          initialData={selectedUser || undefined}
          onCancel={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
        />
      </Modal>
    </div>
  );
}