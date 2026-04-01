import { useState, useCallback } from 'react';
import { fabric } from 'fabric';

export const useFabricEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const initCanvas = useCallback((el: HTMLCanvasElement, width: number, height: number) => {
    const fabricCanvas = new fabric.Canvas(el, {
      width,
      height,
      backgroundColor: 'transparent',
    });
    setCanvas(fabricCanvas);
    return fabricCanvas;
  }, []);

  const addText = useCallback(() => {
    if (!canvas) return;
    const text = new fabric.IText('Type here...', {
      left: 100,
      top: 100,
      fontFamily: 'Inter',
      fontSize: 20,
      fill: '#000000',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  }, [canvas]);

  const addRect = useCallback(() => {
    if (!canvas) return;
    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      fill: 'transparent',
      stroke: '#ff0000',
      strokeWidth: 2,
      width: 100,
      height: 50,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  }, [canvas]);

  const setDrawingMode = useCallback((enabled: boolean) => {
    if (!canvas) return;
    canvas.isDrawingMode = enabled;
    if (enabled) {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.width = 2;
      canvas.freeDrawingBrush.color = '#000000';
    }
  }, [canvas]);

  const deleteSelected = useCallback(() => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    canvas.remove(...activeObjects);
    canvas.discardActiveObject().renderAll();
  }, [canvas]);

  return { 
    canvas, 
    initCanvas, 
    addText, 
    addRect, 
    setDrawingMode, 
    deleteSelected 
  };
};
