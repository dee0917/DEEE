'use client'

import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'
import { SiLine } from 'react-icons/si'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Dock, DockIcon } from '@/components/ui/dock'
import { motion } from 'framer-motion'
import FlickeringGrid from '@/components/ui/flickering-grid'

const NavLink = ({ children }: { children: React.ReactNode }) => (
  <motion.a 
    href="#" 
    className="hover:text-gray-600"
    whileHover={{ scale: 1.2 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {children}
  </motion.a>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* 背景動畫 */}
      <div className="fixed inset-0 z-0">
        <FlickeringGrid 
          squareSize={4}
          gridGap={6}
          flickerChance={0.2}
          color="#000000"
          maxOpacity={0.05}
        />
      </div>

      {/* 導航欄 */}
      <nav className="py-6 px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight">SkMswDee.</div>
          <div className="flex gap-12 text-sm">
            <NavLink>HOME</NavLink>
            <NavLink>PRODUCT</NavLink>
            <NavLink>STORE</NavLink>
            <NavLink>ABOUT ME</NavLink>
          </div>
          <button className="text-2xl">≡</button>
        </div>
      </nav>

      {/* 主要內容區 */}
      <main className="px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-8">
          {/* 左側文字 */}
          <div className="flex flex-col justify-start mt-[180px]">
            <p className="text-gray-800 mb-4 max-w-[400px]">
              I'm just an ordinary people as like you, just don't living within the confines that society imposes...
            </p>
            <RainbowButton className="text-white w-fit px-6">
              Read More
            </RainbowButton>
          </div>

          {/* 中間圖片區域 */}
          <div className="relative h-[700px] col-span-1">
            {/* 黃色圓形背景 */}
            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#F4B63F] rounded-full"></div>
            
            {/* 人物圖片 */}
            <div className="absolute left-[55%] top-[45%] -translate-x-1/2 -translate-y-1/3 w-[500px] h-[650px] z-10">
              <Image
                src="/images/profile.png"
                alt="Profile"
                fill
                priority
                className="grayscale contrast-125 object-contain"
              />
            </div>

            {/* 標語 */}
            <div className="absolute right-[-180px] top-[45%] -translate-y-1/2 z-20">
              <h1 className="text-7xl font-bold text-right leading-[0.9]">
                less is<br />more.
              </h1>
            </div>
          </div>

          {/* 右側空白區域 */}
          <div className="col-span-1"></div>
        </div>
      </main>

      {/* 底部固定區域 - 增加底部間距 */}
      <div className="fixed bottom-16 w-full px-8 z-10">
        <div className="max-w-[1400px] mx-auto flex justify-center items-center">
          <Dock 
            className="supports-backdrop-blur:bg-white/10 rounded-2xl border p-3 backdrop-blur-md flex items-center" 
            magnification={100} 
            distance={120}
          >
            {/* 個人主頁相關 */}
            <DockIcon size={45}>
              <a 
                href="https://www.facebook.com/dee.chen3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-full w-full items-center justify-center"
              >
                <div className="flex items-center justify-center">
                  <FaFacebookF className="text-black text-2xl" />
                </div>
              </a>
            </DockIcon>
            <DockIcon size={45}>
              <a 
                href="https://www.instagram.com/deedeeboy_xoxo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full"
              >
                <FaInstagram className="text-black text-2xl" />
              </a>
            </DockIcon>

            {/* 分隔線 */}
            <div className="h-8 w-[1px] bg-gray-300 mx-2" />

            {/* 內容創作相關 */}
            <DockIcon size={45}>
              <a 
                href="https://www.youtube.com/@DanDee0812" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full"
              >
                <FaYoutube className="text-black text-2xl" />
              </a>
            </DockIcon>
            <DockIcon size={45}>
              <a 
                href="https://www.tiktok.com/@danieldeeboy_xoxo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full"
              >
                <FaTiktok className="text-black text-2xl" />
              </a>
            </DockIcon>

            {/* 分隔線 */}
            <div className="h-8 w-[1px] bg-gray-300 mx-2" />

            {/* 通訊工具相關 */}
            <DockIcon size={45}>
              <a 
                href="https://wa.me/886970737011" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full"
              >
                <FaWhatsapp className="text-black text-2xl" />
              </a>
            </DockIcon>
            <DockIcon size={45}>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full"
              >
                <SiLine className="text-black text-2xl" />
              </a>
            </DockIcon>
            <DockIcon size={45}>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full"
              >
                <FaTelegram className="text-black text-2xl" />
              </a>
            </DockIcon>
          </Dock>
        </div>
      </div>
    </div>
  )
} 