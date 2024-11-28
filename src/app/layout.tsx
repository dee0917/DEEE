import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import React from 'react'

const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['900']  // 只加載 black 字重
})

export const metadata: Metadata = {
  title: "我的個人網站",
  description: "歡迎來到我的個人網站",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 