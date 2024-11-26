/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRangeSliderUi } from "../hooks/useRangeSlider";

export interface RangeSliderProps {
  scale: number;
  onScaleChange: (delta: number) => void;
}

export const RangeSlider = (props: RangeSliderProps) => {
  const {
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = useRangeSliderUi({
    onDeltaChange: (delta) => {
      props.onScaleChange(props.scale + (0.0002 * delta));
    },
  });

  useEffect(() => {
    const pointerMove = (e: globalThis.PointerEvent) => {
      onPointerMove(e.pointerId, e.clientX)
    };
    const pointerUp = (e: globalThis.PointerEvent) => {
      onPointerUp(e.pointerId);
    }
    if (isDragging) {
      window.addEventListener("pointermove", pointerMove);
      window.addEventListener("pointerup", pointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
    }
  }, [onPointerMove, onPointerUp, isDragging]);

  return (
    <div
      css={cssContainer}
      onPointerDown={(e) => {
        onPointerDown(e.pointerId, e.clientX);
      }}
      data-is-dragging={isDragging.toString()}
    >
      {(props.scale * 100).toFixed(2)}%
    </div>
  );
};


const cssContainer = css`
  width: 100%;
  height: 200px;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  touch-action: none;
  &[data-is-dragging="true"] {
    background: maroon;
  }
`;
