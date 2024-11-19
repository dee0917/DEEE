import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import React from 'react'

const inter = Inter({ subsets: ["latin"] })

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