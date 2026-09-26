import { notFound } from 'next/navigation';
import TopBar from '@/components/TopBar';
import { getDictionary } from '@/lib/dictionaries';

const locales = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const t = await getDictionary(locale as Parameters<typeof getDictionary>[0]);
  const navItems = [
    { label: t.nav.about,   href: '/about'   },
    {
      label: t.nav.works,
      href:  '/works',
      sections: [
        { label: 'Sync Licensing', anchor: 'sync'          },
        { label: 'Songs For You',  anchor: 'songs-for-you' },
      ],
    },
    { label: t.nav.live,    href: '/live'    },
    { label: t.nav.notes,   href: '/notes'   },
    { label: t.nav.shop,    href: '/shop'    },
    { label: t.nav.contact, href: '/contact' },
  ];

  return (
    <>
      <TopBar navItems={navItems} />
      {children}
    </>
  );
}
