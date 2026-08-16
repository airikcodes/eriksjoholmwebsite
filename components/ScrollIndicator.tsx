"use client";

export default function ScrollIndicator() {
  return (
    <a
      href="#nav"
      aria-label="Open menu"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator hover:opacity-100 transition-opacity duration-200"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}
    >
      <svg
        width="24"
        height="14"
        viewBox="0 0 18 11"
        fill="none"
        style={{ color: "#C8922A" }}
      >
        <path
          d="M1 1L9 9L17 1"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
