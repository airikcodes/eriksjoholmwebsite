"use client";

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
      <svg
        width="18"
        height="11"
        viewBox="0 0 18 11"
        fill="none"
        style={{ color: "#7A6F62" }}
      >
        <path
          d="M1 1L9 9L17 1"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
