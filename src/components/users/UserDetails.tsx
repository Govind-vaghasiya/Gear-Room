import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { format } from 'date-fns';
import { Asset, Checkout, EquipmentUser } from '../../types';
import { Package } from 'lucide-react';
import { useCheckout } from '../../hooks/useCheckout';
import { toast } from 'react-hot-toast';

interface UserDetailsProps {
  user: EquipmentUser;
  checkouts: Checkout[];
  assets: Asset[];
  onBack: () => void;
}

export function UserDetails({ user, checkouts, assets, onBack }: UserDetailsProps) {
  const { checkoutItem, checkinItem } = useCheckout();
  const [showIssueModal, setShowIssueModal] = useState(false);
  const userCheckouts = checkouts.filter(c => c.userId === user.id);
  
  const handleIssueEquipment = async (qrCode: string) => {
    try {
      const asset = assets.find(a => a.qrCode === qrCode);
      if (!asset) {
        toast.error('Asset not found');
        return;
      }

      if (asset.status === 'checked-out') {
        toast.error('This item is already checked out');
        return;
      }

      await checkoutItem(asset.id!, user.id!, 'direct-issue');
      toast.success(`${asset.name} issued to ${user.name}`); // Fixed template literal syntax
      setShowIssueModal(false);
    } catch (error) {
      console.error('Error issuing equipment:', error);
      toast.error('Failed to issue equipment');
    }
  };

  const handleAcceptReturn = async (assetId: string) => {
    try {
      await checkinItem(assetId);
      toast.success('Return accepted successfully');
    } catch (error) {
      console.error('Error accepting return:', error);
      toast.error('Failed to accept return');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button onClick={onBack} variant="secondary">
          Back to Users
        </Button>
        <Button
          onClick={() => setShowIssueModal(true)}
          variant="primary"
          className="bg-red-600 hover:bg-red-700"
        >
          <Package className="w-4 h-4 mr-2" />
          Issue Equipment
        </Button>
      </div>

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

      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium">Equipment History</h3>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Checkout Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userCheckouts.map((checkout) => {
                  const asset = assets.find(a => a.id === checkout.assetId);
                  return (
                    <tr key={checkout.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {asset?.name || 'Unknown Asset'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {asset?.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(checkout.checkoutDate), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {checkout.returnDate 
                          ? format(new Date(checkout.returnDate), 'MMM d, yyyy')
                          : '-'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          checkout.status === 'checked-out' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {checkout.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {checkout.status === 'checked-out' && (
                          <Button
                            onClick={() => handleAcceptReturn(checkout.assetId)}
                            variant="primary"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Accept Return
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>

      <Modal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        title="Issue Equipment"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Enter the QR code of the equipment to issue to {user.name}
          </p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const qrCode = (e.target as any).qrCode.value;
            handleIssueEquipment(qrCode);
          }}>
            <div className="space-y-4">
              <input
                type="text"
                name="qrCode"
                placeholder="Enter QR Code"
                className="w-full"
                required
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowIssueModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Issue Equipment
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}