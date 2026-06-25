"use client";

import Script from "next/script";

const FORM_ID = "12cecb7e-72ad-4cd0-b12f-3868272593d0";

export default function ResonatorsForm() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem", margin: "0 auto", textAlign: "center" }}>
      <div
        data-beehiiv-form={FORM_ID}
        style={{ width: "100%", display: "block", margin: "0 auto" }}
      />
      <Script
        src="https://subscribe-forms.beehiiv.com/v3/loader.js"
        data-beehiiv-form={FORM_ID}
        strategy="afterInteractive"
      />
    </div>
  );
}
