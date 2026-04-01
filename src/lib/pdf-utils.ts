import { PDFDocument, rgb } from 'pdf-lib';

export interface PdfEdit {
  type: 'text' | 'image' | 'rect';
  pageIndex: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  fontSize?: number;
  color?: { r: number; g: number; b: number };
  src?: string; // For images
}

/**
 * Applies Fabric.js edits to a PDF using pdf-lib
 */
export async function applyEditsToPdf(
  pdfBytes: ArrayBuffer,
  edits: PdfEdit[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();

  for (const edit of edits) {
    const page = pages[edit.pageIndex];
    if (!page) continue;

    const { height } = page.getSize();

    if (edit.type === 'text' && edit.text) {
      page.drawText(edit.text, {
        x: edit.x,
        y: height - edit.y - (edit.fontSize || 12),
        size: edit.fontSize || 12,
        color: edit.color ? rgb(edit.color.r / 255, edit.color.g / 255, edit.color.b / 255) : rgb(0, 0, 0),
      });
    } else if (edit.type === 'rect') {
      page.drawRectangle({
        x: edit.x,
        y: height - edit.y - (edit.height || 0),
        width: edit.width || 0,
        height: edit.height || 0,
        borderColor: rgb(1, 0, 0),
        borderWidth: 1,
      });
    } else if (edit.type === 'image' && edit.src) {
      try {
        const imageBytes = await fetch(edit.src).then((res) => res.arrayBuffer());
        const image = edit.src.includes('png') 
          ? await pdfDoc.embedPng(imageBytes) 
          : await pdfDoc.embedJpg(imageBytes);
        
        page.drawImage(image, {
          x: edit.x,
          y: height - edit.y - (edit.height || 0),
          width: edit.width || 0,
          height: edit.height || 0,
        });
      } catch (e) {
        console.error('Failed to embed image', e);
      }
    }
  }

  return await pdfDoc.save();
}
