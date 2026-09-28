"use client";

import React, { useCallback, useEffect, useState } from "react";

function snapToNearest(scroller: HTMLElement) {
  const panels = Array.from(scroller.children) as HTMLElement[];
  if (!panels.length) return;
  const centre = scroller.scrollLeft + scroller.clientWidth / 2;
  let target = panels[0];
  let closest = Number.POSITIVE_INFINITY;
  panels.forEach((panel) => {
    const distance = Math.abs(panel.offsetLeft + panel.offsetWidth / 2 - centre);
    if (distance < closest) {
      closest = distance;
      target = panel;
    }
  });
  scroller.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
}

/**
 * Dot indicator for a horizontal snap scroller. Listens to the scroller's
 * scroll position to highlight the panel nearest the viewport centre, and
 * scrolls a panel into view on click. Hidden above the mobile breakpoint.
 */
export function CarouselDots({
  targetId,
  count,
  className = "",
  label = "Carousel",
}: {
  targetId: string;
  count: number;
  className?: string;
  label?: string;
}) {
  const [active, setActive] = useState(0);

  const update = useCallback(
    (scroller: HTMLElement) => {
      const panels = Array.from(scroller.children) as HTMLElement[];
      if (!panels.length) return;
      const centre = scroller.scrollLeft + scroller.clientWidth / 2;
      let index = 0;
      let closest = Number.POSITIVE_INFINITY;
      panels.forEach((panel, i) => {
        const distance = Math.abs(panel.offsetLeft + panel.offsetWidth / 2 - centre);
        if (distance < closest) {
          closest = distance;
          index = i;
        }
      });
      setActive(index);
    },
    [],
  );

  useEffect(() => {
    const scroller = document.getElementById(targetId);
    if (!scroller) return;

    const onScroll = () => update(scroller);
    const onResize = () => update(scroller);

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [targetId, update]);

  useEffect(() => {
    const scroller = document.getElementById(targetId);
    if (!scroller) return;

    // A native overflow box only scrolls with touch, trackpad or a visible
    // scrollbar — so a mouse drag does nothing once the scrollbar is hidden.
    // Mirror the gesture with pointer events for mouse input.
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startLeft = scroller.scrollLeft;
      scroller.setPointerCapture(event.pointerId);
      scroller.style.cursor = "grabbing";
      scroller.style.userSelect = "none";
      // Mandatory snapping re-aligns every programmatic scroll, which would
      // yank the strip straight back mid-drag. Park it until release.
      scroller.style.scrollSnapType = "none";
      event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const delta = event.clientX - startX;
      if (!moved && Math.abs(delta) < 3) return;
      moved = true;
      scroller.scrollLeft = startLeft - delta;
      event.preventDefault();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      scroller.style.cursor = "";
      scroller.style.userSelect = "";
      scroller.style.scrollSnapType = "";
      try {
        scroller.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer capture already released.
      }
      if (moved) snapToNearest(scroller);
    };

    const onDragStart = (event: Event) => event.preventDefault();

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);
    scroller.addEventListener("dragstart", onDragStart);
    return () => {
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
      scroller.removeEventListener("dragstart", onDragStart);
      scroller.style.cursor = "";
      scroller.style.userSelect = "";
      scroller.style.scrollSnapType = "";
    };
  }, [targetId]);

  const goTo = (index: number) => {
    const scroller = document.getElementById(targetId);
    const panel = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !panel) return;
    scroller.scrollTo({ left: panel.offsetLeft, behavior: "smooth" });
    setActive(index);
  };

  return (
    <div
      className={`hidden max-[56rem]:flex items-center justify-center gap-1 ${className}`}
      role="group"
      aria-label={label}
    >
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Show photo ${index + 1} of ${count}`}
          aria-current={index === active}
          onClick={() => goTo(index)}
          className="group flex h-6 items-center px-1"
        >
          <span
            className={`h-2 rounded-full transition-all duration-200 ${
              index === active
                ? "w-6 bg-(--accent)"
                : "w-2 bg-(--line-strong) group-hover:bg-(--muted)"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
