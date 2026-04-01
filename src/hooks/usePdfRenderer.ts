import { useState, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export const usePdfRenderer = () => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);

  const loadPdf = useCallback(async (url: string) => {
    const loadingTask = pdfjs.getDocument(url);
    const loadedPdf = await loadingTask.promise;
    setPdf(loadedPdf);
    setNumPages(loadedPdf.numPages);
    return loadedPdf;
  }, []);

  const renderPage = useCallback(async (
    pageNumber: number, 
    canvas: HTMLCanvasElement, 
    scale = 1.5
  ) => {
    if (!pdf) return null;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    
    const context = canvas.getContext('2d');
    if (!context) return null;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    return viewport;
  }, [pdf]);

  return { pdf, numPages, loadPdf, renderPage };
};
