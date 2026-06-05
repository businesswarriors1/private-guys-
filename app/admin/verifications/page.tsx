'use client';

import { useState } from 'react';

interface Verification {
  id: string;
  name: string;
  email: string;
  dateSubmitted: string;
  idStatus: 'pending' | 'verified' | 'rejected';
  selfieStatus: 'pending' | 'verified' | 'rejected';
  idImage?: string;
  selfieImage?: string;
}

// Mock data
const mockVerifications: Verification[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    dateSubmitted: '2024-06-03',
    idStatus: 'pending',
    selfieStatus: 'pending',
    idImage: 'https://via.placeholder.com/400x300?text=ID+Document',
    selfieImage: 'https://via.placeholder.com/400x300?text=Selfie',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    dateSubmitted: '2024-06-02',
    idStatus: 'pending',
    selfieStatus: 'verified',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    dateSubmitted: '2024-06-01',
    idStatus: 'verified',
    selfieStatus: 'verified',
  },
];

export default function VerificationsPage() {
  const [verifications, setVerifications] = useState<Verification[]>(mockVerifications);
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleApproveID = (id: string) => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === id ? { ...v, idStatus: 'verified' } : v))
    );
  };

  const handleApproveSelfie = (id: string) => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === id ? { ...v, selfieStatus: 'verified' } : v))
    );
  };

  const handleReject = (id: string) => {
    setVerifications((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, idStatus: 'rejected', selfieStatus: 'rejected' }
          : v
      )
    );
    setShowModal(false);
    setRejectionReason('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="px-3 py-1 bg-green-900/50 text-green-200 rounded-full text-sm">✅ Verified</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-900/50 text-yellow-200 rounded-full text-sm">⏳ Pending</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-900/50 text-red-200 rounded-full text-sm">❌ Rejected</span>;
      default:
        return null;
    }
  };

  const pendingCount = verifications.filter(
    (v) => v.idStatus === 'pending' || v.selfieStatus === 'pending'
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Verification Queue</h1>
        <p className="text-slate-400">
          {pendingCount} pending verification{pendingCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Verification Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Submitted</th>
                <th className="px-6 py-4 text-left font-semibold">ID Status</th>
                <th className="px-6 py-4 text-left font-semibold">Selfie Status</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {verifications.map((verification) => (
                <tr key={verification.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4">{verification.name}</td>
                  <td className="px-6 py-4 text-slate-400">{verification.email}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {new Date(verification.dateSubmitted).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(verification.idStatus)}</td>
                  <td className="px-6 py-4">{getStatusBadge(verification.selfieStatus)}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedVerification(verification);
                        setShowModal(true);
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {showModal && selectedVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Review Verification</h2>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">{selectedVerification.name}</p>
              <p className="text-slate-400">{selectedVerification.email}</p>
            </div>

            {/* Images Side by Side */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2">ID Document</h3>
                {selectedVerification.idImage ? (
                  <div className="relative pb-full bg-slate-700 rounded-lg overflow-hidden">
                    <img
                      src={selectedVerification.idImage}
                      alt="ID Document"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400">
                    No image provided
                  </div>
                )}
                <div className="mt-2">{getStatusBadge(selectedVerification.idStatus)}</div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Selfie</h3>
                {selectedVerification.selfieImage ? (
                  <div className="relative pb-full bg-slate-700 rounded-lg overflow-hidden">
                    <img
                      src={selectedVerification.selfieImage}
                      alt="Selfie"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400">
                    No image provided
                  </div>
                )}
                <div className="mt-2">{getStatusBadge(selectedVerification.selfieStatus)}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-3">
                {selectedVerification.idStatus !== 'verified' && (
                  <button
                    onClick={() => handleApproveID(selectedVerification.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                  >
                    ✅ Approve ID
                  </button>
                )}
                {selectedVerification.selfieStatus !== 'verified' && (
                  <button
                    onClick={() => handleApproveSelfie(selectedVerification.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                  >
                    ✅ Approve Selfie
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Rejection Reason (if applicable)</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="Explain why the verification is rejected..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleReject(selectedVerification.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  ❌ Reject
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
