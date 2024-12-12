import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useProductions } from '../hooks/useProductions';
import { Production } from '../types/production';

export default function Productions() {
  const { productions, loading, error, createProduction, updateProduction, deleteProduction } = useProductions();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState<Production | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productionData = {
      name: formData.get('production-name') as string,
      dopName: formData.get('dop-name') as string,
      shootingDate: formData.get('shooting-date') as string,
      showName: formData.get('show-name') as string,
      status: 'active' as const
    };

    try {
      if (selectedProduction) {
        await updateProduction(selectedProduction.id!, productionData);
      } else {
        await createProduction(productionData);
      }
      setShowModal(false);
      setSelectedProduction(null);
    } catch (error) {
      console.error('Error saving production:', error);
    }
  };

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
        Error loading productions. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Productions</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all productions including their name, DOP, shooting date, and show name.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            onClick={() => setShowModal(true)}
            variant="primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Production
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <Card.Content>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Production Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      DOP Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Shooting Date
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Show Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {productions.map((production) => (
                    <tr key={production.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {production.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {production.dopName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {production.shootingDate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {production.showName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          production.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {production.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                        <Button
                          onClick={() => {
                            setSelectedProduction(production);
                            setShowModal(true);
                          }}
                          variant="secondary"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Content>
        </Card>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProduction(null);
        }}
        title={selectedProduction ? 'Edit Production' : 'Add New Production'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="production-name" className="block text-sm font-medium text-gray-700">
              Production Name
            </label>
            <input
              type="text"
              name="production-name"
              id="production-name"
              defaultValue={selectedProduction?.name}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="dop-name" className="block text-sm font-medium text-gray-700">
              DOP Name
            </label>
            <input
              type="text"
              name="dop-name"
              id="dop-name"
              defaultValue={selectedProduction?.dopName}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="shooting-date" className="block text-sm font-medium text-gray-700">
              Shooting Date
            </label>
            <input
              type="date"
              name="shooting-date"
              id="shooting-date"
              defaultValue={selectedProduction?.shootingDate}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="show-name" className="block text-sm font-medium text-gray-700">
              Show Name
            </label>
            <input
              type="text"
              name="show-name"
              id="show-name"
              defaultValue={selectedProduction?.showName}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
            <Button
              type="submit"
              variant="primary"
            >
              {selectedProduction ? 'Update' : 'Create'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                setSelectedProduction(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}