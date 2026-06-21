"use client";

import Script from "next/script";

const FORM_ID = "12cecb7e-72ad-4cd0-b12f-3868272593d0";

export default function Subscribe() {
  return (
    <section className="py-32 border-t border-white/5">
      <div className="px-6 md:px-10 max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-14">
          <span className="block w-10 h-px bg-[#F59E0B]" />
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#888888]">
            Stay in the loop
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-white leading-snug mb-4">
          New music, shows,<br />stories.
        </h2>
        <p className="text-[#666666] text-sm mb-10">No noise. Just the things that matter.</p>

        {/* Beehiiv form renders into this div */}
        <div data-beehiiv-form={FORM_ID} />

        <Script
          src="https://subscribe-forms.beehiiv.com/v3/loader.js"
          data-beehiiv-form={FORM_ID}
          strategy="afterInteractive"
        />
      </div>
    </section>
  );
}
