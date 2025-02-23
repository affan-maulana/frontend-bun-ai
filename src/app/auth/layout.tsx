import Head from 'next/head';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
       <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Head>
          <title>Bun AI Chat</title>
        </Head>
        {children}
      </div>
    </body>
  )
}