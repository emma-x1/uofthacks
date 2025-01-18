import './globals.css'
import localFont from 'next/font/local'
import { Roboto } from 'next/font/google'

const proximaNova = localFont({
  src: [
    {
      path: '../public/fonts/ProximaNova-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/ProximaNova-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-proxima-nova',
})

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata = {
  title: 'Temperature Analysis',
  description: 'Analyze temperature and events over time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${proximaNova.variable} ${roboto.variable}`}>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}

