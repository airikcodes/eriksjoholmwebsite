"use client";

import Script from "next/script";

const FORM_ID = "12cecb7e-72ad-4cd0-b12f-3868272593d0";

export default function ResonatorsForm() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div data-beehiiv-form={FORM_ID} />
      <Script
        src="https://subscribe-forms.beehiiv.com/v3/loader.js"
        data-beehiiv-form={FORM_ID}
        strategy="afterInteractive"
      />
    </div>
  );
}
