import Link from "next/link";

export default function BackNav() {
  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <Link
        href="/"
        className="hover:text-[#C8922A] transition-colors duration-200"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          textDecoration: "none",
          color: "#7A6F62",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "1.5rem",
            height: "1px",
            background: "currentColor",
            flexShrink: 0,
          }}
        />
        <span
          className="font-[family-name:var(--font-cormorant)] font-light"
          style={{ fontSize: "0.85rem", letterSpacing: "0.2em" }}
        >
          Erik Sjøholm
        </span>
      </Link>
    </div>
  );
}
