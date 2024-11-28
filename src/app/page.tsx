'use client'

import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'
import { SiLine } from 'react-icons/si'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Dock, DockIcon, DEFAULT_MAGNIFICATION, DEFAULT_DISTANCE } from '@/components/ui/dock'
import { motion } from 'framer-motion'
import { RetroGrid } from '@/components/ui/retro-grid'
import { useState } from 'react'

// 定義 NavLink 組件的 props 類型
interface NavLinkProps {
  children: React.ReactNode;
  href?: string;
}

// 更新 NavLink 組件
const NavLink = ({ children, href = "#" }: NavLinkProps) => (
  <a 
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className="relative px-3 py-1 group transition-colors duration-300 hover:text-gray-600"
  >
    {/* 背景動畫效果 */}
    <span className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out bottom-0 group-hover:h-full -z-10 rounded-md" />
    
    {/* 文字 */}
    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
      {children}
    </span>
  </a>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* 背景動畫 */}
      <RetroGrid className="fixed inset-0 z-0" />

      {/* 導航欄 */}
      <nav className="py-6 relative z-10">
        <div className="max-w-[1400px] mx-auto flex justify-center items-center relative">
          {/* Logo - 絕對定位到左側 */}
          <div className="absolute left-8 text-2xl font-bold tracking-tight">
            SkMswDee.
          </div>
          
          {/* 導航連結 - 居中對齊，使用 -ml-21 */}
          <div className="flex gap-12 text-sm -ml-21">
            <NavLink>HOME</NavLink>
            <NavLink>PRODUCT</NavLink>
            <NavLink href="https://dandeetw.com/index.php?route=common/home">STORE</NavLink>
            <NavLink>ABOUT ME</NavLink>
          </div>

          {/* 選單按鈕 - 絕對定位到右側 */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="absolute right-8 text-2xl hover:opacity-70 transition-opacity"
          >
            ≡
          </button>
        </div>
      </nav>

      {/* 主要內容區 */}
      <main className="px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-8">
          {/* 左側區域 - 保持空白 */}
          <div className="flex flex-col justify-start mt-[180px]">
          </div>

          {/* 中間圖片區域 */}
          <div className="relative h-[700px] col-span-1">
            {/* 強烈現代感圓形背景 - 只調整圓圈的 TOP 值 */}
            <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-[525px] h-[525px] rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-600 to-indigo-600 opacity-95 animate-pulse-strong shadow-[0_0_80px_rgba(219,39,119,0.4)]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-white/20 to-transparent" />
            </div>
            
            {/* 人物圖片區域 */}
            <div className="absolute left-[55%] top-[48%] -translate-x-1/2 -translate-y-1/3 w-[500px] h-[650px] z-10 group">
              {/* 主圖片 - 彩色底層 */}
              <Image
                src="/images/profile.png"
                alt="Profile"
                fill
                priority
                className="object-contain transform transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
              />
              
              {/* 黑白圖層 - 使用 clip-path 效果 */}
              <div className="absolute inset-0 transition-all duration-1000 ease-in-out group-hover:[clip-path:circle(0%_at_50%_50%)] [clip-path:circle(100%_at_50%_50%)]">
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  fill
                  priority
                  className="grayscale contrast-125 object-contain"
                />
              </div>

              {/* 動態光環效果 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                {/* 內層光環 */}
                <div className="absolute inset-0 animate-pulse-fast">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-white/10 to-indigo-500/0 blur-2xl" />
                </div>
                
                {/* 外層光環 */}
                <div className="absolute -inset-4 animate-pulse-slow">
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 via-white/5 to-violet-500/0 blur-3xl" />
                </div>
              </div>

              {/* 懸浮粒子效果 */}
              <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 3}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 標語 - 保持原位 */}
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

      {/* 垂直社交媒體 Dock */}
      <Dock>
        {/* Facebook */}
        <DockIcon>
          <motion.a 
            href="https://www.facebook.com/dee.chen3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex h-full w-full items-center justify-center text-black hover:text-[#1877f2] transition-colors duration-200"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaFacebookF className="text-xl" />
          </motion.a>
        </DockIcon>

        {/* Instagram */}
        <DockIcon>
          <motion.a 
            href="https://www.instagram.com/deedeeboy_xoxo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex h-full w-full items-center justify-center text-black hover:text-[#E4405F] transition-colors duration-200"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaInstagram className="text-xl" />
          </motion.a>
        </DockIcon>

        {/* YouTube */}
        <DockIcon>
          <motion.a 
            href="https://www.youtube.com/@DanDee0812" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex h-full w-full items-center justify-center text-black hover:text-[#FF0000] transition-colors duration-200"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaYoutube className="text-xl" />
          </motion.a>
        </DockIcon>

        {/* Email */}
        <DockIcon>
          <motion.a 
            href="mailto:example@email.com"
            className="flex h-full w-full items-center justify-center text-black hover:text-[#EA4335] transition-colors duration-200"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </motion.a>
        </DockIcon>

        {/* 更多選項 */}
        <DockIcon>
          <motion.button 
            className="flex h-full w-full items-center justify-center text-black hover:text-gray-900 transition-colors duration-200"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </motion.button>
        </DockIcon>
      </Dock>
    </div>
  )
} 