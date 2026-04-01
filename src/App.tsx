import React, { useState } from 'react';
import PDFViewer from './components/editor/PDFViewer';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { FileText, LayoutDashboard, Settings, LogOut, User, Loader2 } from 'lucide-react';
import { supabase } from './lib/supabase';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  
  // Mock PDF URL for demonstration
  const samplePdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login onToggle={() => {}} />;
  }

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 border-r flex flex-col bg-white">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <FileText size={24} />
          </div>
          <span className="hidden lg:block font-bold text-xl tracking-tight">PDFPro</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button 
            onClick={() => setView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${view === 'dashboard' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <LayoutDashboard size={20} />
            <span className="hidden lg:block">Dashboard</span>
          </button>
          <button 
            onClick={() => setView('editor')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${view === 'editor' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <FileText size={20} />
            <span className="hidden lg:block">Editor</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition">
            <User size={20} />
            <span className="hidden lg:block">Profile</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition">
            <Settings size={20} />
            <span className="hidden lg:block">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={() => supabase.auth.signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
          >
            <LogOut size={20} />
            <span className="hidden lg:block font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {view === 'dashboard' ? (
          <Dashboard />
        ) : (
          <PDFViewer url={samplePdfUrl} />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
