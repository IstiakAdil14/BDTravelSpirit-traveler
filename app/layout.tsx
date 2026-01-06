import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientShell from '@/components/ClientShell';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'BD Travel Spirit',
    description: 'Explore Bangladesh with the best tour operators',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <ClientShell>
                        {children}
                    </ClientShell>
                </Providers>
            </body>
        </html>
    );
}
