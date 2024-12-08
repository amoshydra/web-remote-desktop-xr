import { useCallback, useState } from "react";

export interface UseRangeSliderUiProps {
  onDeltaChange: (delta: number) => void;
}

export const useRangeSliderUi = ({ onDeltaChange }: UseRangeSliderUiProps) => {
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [dragStartPosition, setDragStartPosition] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);

  const isDragging = draggingIndex > -1;

  const onPointerDown = useCallback((pointerId: number, newPosition: number) => {
    if (isDragging) {
      return;
    }
    setDragStartPosition(newPosition);
    setDraggingIndex(pointerId);
  }, [isDragging]);

  const onPointerMove = useCallback((pointerId: number, newPosition: number) => {
    if (pointerId !== draggingIndex) {
      return
    }
    const movedDistance = newPosition - dragStartPosition;
    onDeltaChange(movedDistance);
    setSliderPosition(movedDistance);
  }, [dragStartPosition, draggingIndex]);

  const onPointerUp = useCallback((pointerId: number) => {
    if (pointerId !== draggingIndex) {
      return;
    }
    setDraggingIndex(-1);
    setDragStartPosition(0);
    setSliderPosition(0);
  }, [dragStartPosition, draggingIndex]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    isDragging,
    delta: sliderPosition,
  };
};