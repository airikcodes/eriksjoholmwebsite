// Progressive blur at the bottom edge of every page.
// Five stacked backdrop-filter layers, each masked with a gradient
// so the blur ramps up gradually toward the very bottom of the viewport
// rather than snapping on at a fixed line.
//
// z-index 5 puts this above page content (2) but below the portrait
// mark (10), sound controls (50), overlay (55), and MENU toggle (60).

const layers: { height: number; blur: number }[] = [
  { height:  32, blur: 16   },
  { height:  68, blur: 10   },
  { height: 112, blur:  6   },
  { height: 168, blur:  3   },
  { height: 228, blur:  1.5 },
];

export default function GradientBlur() {
  return (
    <>
      {layers.map(({ height, blur }, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position:            'fixed',
            bottom:              0,
            left:                0,
            right:               0,
            height:              `${height}px`,
            backdropFilter:      `blur(${blur}px)`,
            WebkitBackdropFilter:`blur(${blur}px)`,
            maskImage:           'linear-gradient(to top, black, transparent)',
            WebkitMaskImage:     'linear-gradient(to top, black, transparent)',
            pointerEvents:       'none',
            zIndex:              5,
          }}
        />
      ))}
    </>
  );
}
