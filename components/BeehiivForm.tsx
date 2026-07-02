'use client';

import { useEffect, useRef } from 'react';

const FORM_ID = '12cecb7e-72ad-4cd0-b12f-3868272593d0';
const LOADER_SRC = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
const ATTR_SRC = 'https://subscribe-forms.beehiiv.com/attribution.js';

export default function BeehiivForm() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // Attribution script (no data attr needed)
    const attr = document.createElement('script');
    attr.src = ATTR_SRC;
    attr.async = true;
    document.head.appendChild(attr);

    // Form loader — data-beehiiv-form must be on the script element itself
    const loader = document.createElement('script');
    loader.src = LOADER_SRC;
    loader.async = true;
    loader.setAttribute('data-beehiiv-form', FORM_ID);
    document.head.appendChild(loader);
  }, []);

  return (
    <div
      data-beehiiv-form={FORM_ID}
      style={{ minHeight: '120px' }}
    />
  );
}
