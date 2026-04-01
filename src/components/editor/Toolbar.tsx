import React from 'react';
import { 
  Type, 
  Square, 
  MousePointer, 
  Download, 
  PenTool, 
  Trash2, 
  Save,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface ToolbarProps {
  onAddText: () => void;
  onAddRect: () => void;
  onToggleDraw: (enabled: boolean) => void;
  onDelete: () => void;
  onSave: () => void;
  onDownload: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDrawing: boolean;
}

export default function Toolbar({
  onAddText,
  onAddRect,
  onToggleDraw,
  onDelete,
  onSave,
  onDownload,
  currentPage,
  totalPages,
  onPageChange,
  isDrawing
}: ToolbarProps) {
  return (
    <div className="h-14 border-b bg-white flex items-center justify-between px-6 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-1">
        <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-4">
          <button 
            onClick={() => onToggleDraw(false)}
            className={`p-1.5 rounded-md transition ${!isDrawing ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            title="Select"
          >
            <MousePointer size={18} />
          </button>
          <button 
            onClick={() => onToggleDraw(true)}
            className={`p-1.5 rounded-md transition ${isDrawing ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            title="Draw"
          >
            <PenTool size={18} />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-200 mx-2" />

        <button onClick={onAddText} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition" title="Add Text">
          <Type size={20} />
        </button>
        <button onClick={onAddRect} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition" title="Add Rectangle">
          <Square size={20} />
        </button>
        
        <div className="h-6 w-px bg-gray-200 mx-2" />
        
        <button onClick={onDelete} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition" title="Delete Selected">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border">
          <button 
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium min-w-[60px] text-center">
            Page {currentPage} / {totalPages}
          </span>
          <button 
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
        >
          <Save size={18} />
          <span>Save</span>
        </button>
        <button 
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium shadow-sm transition"
        >
          <Download size={18} />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}
