import { ReactNode, useEffect } from "react";
import { classNames } from "../EntryFlat/utils/cssHelper";
import { useRangeSliderUi } from "../hooks/useRangeSlider";

export interface RangeSliderProps {
  value: number;
  onValueChange: (newValue: number) => void;
  children?: ReactNode;
  className?: string;
}

export const RangeSlider = (props: RangeSliderProps) => {
  const {
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = useRangeSliderUi({
    onDeltaChange: (delta) => {
      props.onValueChange(delta);
    },
  });

  useEffect(() => {
    const pointerMove = (e: globalThis.PointerEvent) => {
      onPointerMove(e.pointerId, e.clientY)
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
      className={
        classNames(
          `
            rounded-md
            shadow-inner

            flex justify-center items-center
            select-none touch-none

            from-slate-200
            hover:from-slate-200
            active:from-slate-300
            bg-gradient-to-t
            to-neutral-200
            hover:to-neutral-300
            active:to-neutral-300
          `,
          props.className
        )
      }
      onPointerDown={(e) => {
        onPointerDown(e.pointerId, e.clientY);
      }}
    >
      {props.children}
    </div>
  );
};
