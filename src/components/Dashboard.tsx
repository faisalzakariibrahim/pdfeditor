import React from 'react';
import { FileText, Upload, Clock, Share2, MoreVertical, Plus } from 'lucide-react';

export default function Dashboard() {
  const documents = [
    { id: '1', name: 'Contract_2024.pdf', date: '2 hours ago', size: '1.2 MB' },
    { id: '2', name: 'Invoice_March.pdf', date: 'Yesterday', size: '450 KB' },
    { id: '3', name: 'Design_Proposal.pdf', date: '3 days ago', size: '5.8 MB' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
            <p className="text-gray-500 mt-1">Manage and edit your PDF files</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
            <Plus size={20} />
            <span>Upload PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upload Card */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-white hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer group">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition">
              <Upload size={28} />
            </div>
            <p className="font-semibold text-gray-700">Drop your PDF here</p>
            <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
          </div>

          {/* Document Cards */}
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                  <FileText size={24} />
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                  <MoreVertical size={20} />
                </button>
              </div>
              <h3 className="font-bold text-gray-900 truncate mb-1">{doc.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{doc.date}</span>
                </div>
                <span>{doc.size}</span>
              </div>
              <div className="mt-6 flex gap-2">
                <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                  Edit
                </button>
                <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
