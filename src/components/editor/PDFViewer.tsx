import React, { useEffect, useRef, useState } from 'react';
import { usePdfRenderer } from '@/hooks/usePdfRenderer';
import { useFabricEditor } from '@/hooks/useFabricEditor';
import Toolbar from './Toolbar';

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { numPages, loadPdf, renderPage } = usePdfRenderer();
  const { canvas, initCanvas, addText, addRect, setDrawingMode, deleteSelected } = useFabricEditor();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        await loadPdf(url);
      } catch (err) {
        console.error('Error loading PDF:', err);
      }
      setLoading(false);
    };
    init();
  }, [url, loadPdf]);

  useEffect(() => {
    const render = async () => {
      if (!pdfCanvasRef.current || !fabricCanvasRef.current) return;
      
      const viewport = await renderPage(currentPage, pdfCanvasRef.current);
      if (viewport) {
        // Clear previous canvas if it exists
        if (canvas) {
          canvas.dispose();
        }
        
        initCanvas(fabricCanvasRef.current, viewport.width, viewport.height);
      }
    };
    render();
  }, [currentPage, renderPage, initCanvas]);

  const handleToggleDraw = (enabled: boolean) => {
    setIsDrawing(enabled);
    setDrawingMode(enabled);
  };

  const handleSave = () => {
    if (!canvas) return;
    const data = canvas.toJSON();
    console.log('Saving edits for page', currentPage, data);
    // In a real app, send this to Supabase
  };

  const handleDownload = async () => {
    console.log('Downloading modified PDF...');
    // Logic to merge Fabric objects with PDF using pdf-lib
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 overflow-hidden">
      <Toolbar 
        onAddText={addText}
        onAddRect={addRect}
        onToggleDraw={handleToggleDraw}
        onDelete={deleteSelected}
        onSave={handleSave}
        onDownload={handleDownload}
        currentPage={currentPage}
        totalPages={numPages}
        onPageChange={setCurrentPage}
        isDrawing={isDrawing}
      />
      
      <div className="flex-1 overflow-auto p-10 flex justify-center items-start">
        <div 
          ref={containerRef}
          className="relative bg-white shadow-2xl rounded-sm transition-all duration-300"
          style={{ minHeight: '500px', minWidth: '400px' }}
        >
          {/* Layer 1: PDF Canvas */}
          <canvas 
            ref={pdfCanvasRef} 
            className="block"
          />
          
          {/* Layer 2: Fabric Canvas */}
          <div className="absolute top-0 left-0 z-10">
            <canvas ref={fabricCanvasRef} />
          </div>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600 font-medium">Rendering PDF...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
