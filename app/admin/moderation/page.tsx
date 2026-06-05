'use client';

import { useState } from 'react';

interface ModerationItem {
  id: string;
  type: 'new_listing' | 'photo_upload' | 'edit' | 'report';
  title: string;
  user: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

// Mock data
const mockItems: ModerationItem[] = [
  {
    id: '1',
    type: 'new_listing',
    title: 'New listing from John Doe',
    user: 'John Doe',
    date: '2024-06-05',
    status: 'pending',
  },
  {
    id: '2',
    type: 'photo_upload',
    title: 'New photos uploaded by Jane Smith',
    user: 'Jane Smith',
    date: '2024-06-05',
    status: 'pending',
  },
  {
    id: '3',
    type: 'report',
    title: 'Inappropriate content reported',
    user: 'System',
    date: '2024-06-04',
    status: 'pending',
    reason: 'User flagged listing as containing explicit content',
  },
  {
    id: '4',
    type: 'edit',
    title: 'Listing updated by Mike Chen',
    user: 'Mike Chen',
    date: '2024-06-04',
    status: 'approved',
  },
];

const TABS = ['all', 'new_listing', 'photo_upload', 'edit', 'report'] as const;

export default function ModerationPage() {
  const [items, setItems] = useState<ModerationItem[]>(mockItems);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('all');
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredItems = activeTab === 'all' ? items : items.filter((item) => item.type === activeTab);
  const pendingCount = filteredItems.filter((item) => item.status === 'pending').length;

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
    setShowDetails(false);
  };

  const handleReject = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
    setShowDetails(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'new_listing':
        return '📋';
      case 'photo_upload':
        return '📷';
      case 'edit':
        return '✏️';
      case 'report':
        return '⚠️';
      default:
        return '•';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 bg-green-900/50 text-green-200 rounded-full text-sm">✅ Approved</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-900/50 text-yellow-200 rounded-full text-sm">⏳ Pending</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-900/50 text-red-200 rounded-full text-sm">❌ Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Moderation Queue</h1>
        <p className="text-slate-400">
          {pendingCount} item{pendingCount !== 1 ? 's' : ''} pending review
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === tab
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.replace(/_/g, ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer"
            onClick={() => {
              setSelectedItem(item);
              setShowDetails(true);
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-2">By {item.user}</p>
                {item.reason && <p className="text-slate-300 text-sm italic">Reason: {item.reason}</p>}
              </div>
              <div className="flex flex-col items-end gap-2">
                {getStatusBadge(item.status)}
                <p className="text-slate-400 text-sm">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
            <p className="text-slate-400 text-lg">No items to moderate</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>

            <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">User</p>
                  <p className="font-semibold">{selectedItem.user}</p>
                </div>
                <div>
                  <p className="text-slate-400">Date</p>
                  <p className="font-semibold">{new Date(selectedItem.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-slate-400">Type</p>
                  <p className="font-semibold">{selectedItem.type.replace(/_/g, ' ').toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-slate-400">Status</p>
                  {getStatusBadge(selectedItem.status)}
                </div>
              </div>
            </div>

            {selectedItem.reason && (
              <div className="mb-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
                <p className="text-yellow-200 text-sm">
                  <strong>Report Reason:</strong> {selectedItem.reason}
                </p>
              </div>
            )}

            <div className="bg-slate-700/30 rounded-lg p-6 mb-6 min-h-32">
              <p className="text-slate-400 text-center py-12">
                [Content Preview - Listing/Photo/Edit details would display here]
              </p>
            </div>

            {selectedItem.status === 'pending' && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(selectedItem.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleReject(selectedItem.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  ❌ Reject
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            )}

            {selectedItem.status !== 'pending' && (
              <button
                onClick={() => setShowDetails(false)}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
