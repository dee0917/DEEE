'use client'

import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'
import { SiLine } from 'react-icons/si'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Dock, DockIcon, DEFAULT_MAGNIFICATION, DEFAULT_DISTANCE } from '@/components/ui/dock'
import { motion } from 'framer-motion'
import { RetroGrid } from '@/components/ui/retro-grid'
import { useState, useEffect } from 'react'
import { SocialModal } from '@/components/ui/social-modal'
import { SideMenu } from '@/components/ui/side-menu'
import { EmailModal } from '@/components/ui/email-modal'
import { ContactModal } from '@/components/ui/contact-modal'
import { AboutModal } from '@/components/ui/about-modal'
import { PortfolioModal } from '@/components/ui/portfolio-modal'
import { IoShareSocialOutline } from 'react-icons/io5'

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
    <span className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 
      group-hover:opacity-100 transition-all duration-300 ease-out bottom-0 group-hover:h-full -z-10 rounded-md" 
    />
    
    {/* 文字 - 更新字體和樣式 */}
    <span className="relative z-10 transition-colors duration-300 group-hover:text-white
      font-['Montserrat'] tracking-wide text-sm font-semibold"
    >
      {children}
    </span>
  </a>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  useEffect(() => {
    const particles = document.querySelectorAll('.animate-float');
    particles.forEach(particle => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = 2 + Math.random() * 3;
      
      (particle as HTMLElement).style.left = `${left}%`;
      (particle as HTMLElement).style.top = `${top}%`;
      (particle as HTMLElement).style.animationDelay = `${delay}s`;
      (particle as HTMLElement).style.animationDuration = `${duration}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* 添加 RetroGrid 背景 */}
      <RetroGrid />

      {/* 導航欄 */}
      <nav className="py-3 relative z-50">
        {/* 桌面版導航 */}
        <div className="hidden md:flex max-w-[1200px] mx-auto items-center justify-between px-6">
          {/* Logo */}
          <motion.div className="relative">
            <motion.a
              href="/"
              className="relative group inline-flex items-center"
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-black tracking-tighter text-black 
                font-['Montserrat'] relative z-10 group-hover:tracking-normal transition-all duration-300"
              >
                SkMsw
                <span className="text-black font-['Montserrat'] font-black">Dee</span>
                <span className="text-black opacity-90">.</span>
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-fuchsia-500/0 to-indigo-500/0
                  group-hover:from-rose-500/5 group-hover:via-fuchsia-500/5 group-hover:to-indigo-500/5
                  blur-lg -z-10 rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
          
          {/* 導航連結 */}
          <div className="flex items-center gap-1">
            <motion.button
              onClick={() => setIsAboutModalOpen(true)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600
                         hover:text-black hover:bg-gray-100/80 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              關於我
            </motion.button>

            <motion.button
              onClick={() => setIsPortfolioModalOpen(true)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600
                         hover:text-black hover:bg-gray-100/80 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              作品集
            </motion.button>

            <motion.button
              onClick={() => setIsContactModalOpen(true)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600
                         hover:text-black hover:bg-gray-100/80 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              聯絡我
            </motion.button>
          </div>

          {/* 社群媒體按鈕 */}
          <motion.button
            onClick={() => setIsSocialModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                       bg-gradient-to-r from-rose-500 to-indigo-600 text-white
                       hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IoShareSocialOutline className="text-lg" />
            <span>社群媒體</span>
          </motion.button>
        </div>

        {/* 手機版導航 */}
        <div className="md:hidden flex items-center justify-between px-4">
          <motion.a
            href="/"
            className="text-lg font-black tracking-tighter text-black font-['Montserrat']"
            whileTap={{ scale: 0.95 }}
          >
            SkMsw<span className="font-black">Dee</span>
            <span className="opacity-90">.</span>
          </motion.a>
          
          <motion.button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100/80 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </nav>

      {/* 主要內容區 */}
      <main className="px-4 md:px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          {/* 桌面版佈局 */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {/* 左側區域 */}
            <div className="flex flex-col justify-start mt-[180px]">
            </div>

            {/* 中間圖片區域 - 桌面版 */}
            <div className="relative h-[700px] col-span-1">
              {/* 強烈現代感圓形背景 */}
              <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 
                            w-[300px] h-[300px] md:w-[525px] md:h-[525px] rounded-full 
                            bg-gradient-to-r from-rose-500 via-fuchsia-600 to-indigo-600 
                            opacity-95 animate-pulse-strong 
                            shadow-[0_0_80px_rgba(219,39,119,0.4)]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-white/20 to-transparent" />
              </div>
              
              {/* 人物圖片區域 */}
              <div className="absolute left-[55%] top-[48%] -translate-x-1/2 -translate-y-1/3 
                            w-[300px] h-[450px] md:w-[500px] md:h-[650px] z-10 group">
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
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={false}
                      animate={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity as any,
                        repeatType: "reverse",
                        ease: "linear",
                        x: {
                          duration: 5,
                          repeat: Infinity as any,
                          repeatType: "reverse"
                        },
                        y: {
                          duration: 5,
                          repeat: Infinity as any,
                          repeatType: "reverse"
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 標語 - 手機版位置調整 */}
              <div className="absolute right-[-10px] md:right-[-180px] top-[30%] md:top-[45%] -translate-y-1/2 z-20">
                <motion.h1 
                  className="text-4xl md:text-7xl text-right leading-[0.9] relative group"
                >
                  <motion.div
                    className="relative"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.span 
                      className="block relative font-['Montserrat'] font-semibold tracking-wide"
                      whileHover={{
                        x: -10,
                        transition: { type: "spring", stiffness: 300, damping: 10 }
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-rose-500/0 to-indigo-600/0 
                        group-hover:from-rose-500/5 group-hover:to-indigo-600/5 
                        blur-xl transition-all duration-300 -z-10" 
                      />
                      Dee
                    </motion.span>
                  </motion.div>
                  
                  <motion.div
                    className="relative"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.span 
                      className="block relative font-['Montserrat'] font-semibold tracking-wide"
                      whileHover={{
                        x: -10,
                        transition: { type: "spring", stiffness: 300, damping: 10 }
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-rose-500/0 to-indigo-600/0 
                        group-hover:from-rose-500/5 group-hover:to-indigo-600/5 
                        blur-xl transition-all duration-300 -z-10" 
                      />
                      Chen
                      <span className="font-['Montserrat'] font-semibold">.</span>
                    </motion.span>
                  </motion.div>
                </motion.h1>
              </div>
            </div>

            {/* 右側空白區域 - 在隱藏 */}
            <div className="hidden md:block col-span-1"></div>
          </div>

          {/* 手機版佈 */}
          <div className="md:hidden">
            {/* 中間圖片區域 - 手機版 */}
            <div className="relative h-[500px]">
              {/* 強烈現代感圓形背景 - 手機版 */}
              <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 
                            w-[300px] h-[300px] rounded-full 
                            bg-gradient-to-r from-rose-500 via-fuchsia-600 to-indigo-600 
                            opacity-95 animate-pulse-strong z-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-white/20 to-transparent" />
              </div>
              
              {/* 人物圖片區域 - 手機版 */}
              <div className="absolute left-[55%] top-[25%] -translate-x-1/2 -translate-y-1/3 
                            w-[300px] h-[450px] z-10 pointer-events-none">
                {/* 主圖片容器 */}
                <div className="relative w-full h-full group/image pointer-events-auto">
                  {/* 主圖片 - 彩色底層 */}
                  <Image
                    src="/images/profile.png"
                    alt="Profile"
                    fill
                    priority
                    className="object-contain transform transition-all duration-1000 ease-out scale-100 group-hover/image:scale-105"
                  />
                  
                  {/* 黑白圖層 - 使用 clip-path 效果 */}
                  <div className="absolute inset-0 transition-all duration-1000 ease-in-out 
                                group-hover/image:[clip-path:circle(0%_at_50%_50%)] [clip-path:circle(100%_at_50%_50%)]">
                    <Image
                      src="/images/profile.png"
                      alt="Profile"
                      fill
                      priority
                      className="grayscale contrast-125 object-contain"
                    />
                  </div>

                  {/* 動態光環效果 */}
                  <div className="absolute inset-0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-1000">
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
                  <div className="absolute -inset-10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-1000 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={false}
                        style={{
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                          transition: {
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity as any,
                            repeatType: "mirror",
                            ease: "linear"
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 標語 - 新位置 */}
              <div className="absolute left-[50%] bottom-[20%] -translate-x-1/2 z-10 text-center">
                <motion.h1 
                  className="text-4xl font-['Montserrat'] font-black tracking-tighter whitespace-nowrap relative cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="relative"
                    initial={{ color: "#000000" }}
                    animate={{ 
                      color: ["#000000", "#FF0080", "#7928CA", "#000000"],
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <motion.span
                      className="relative inline-block"
                      whileHover={{
                        letterSpacing: "0.1em",
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* 閃光效果 */}
                      <motion.span
                        className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                        whileHover={{
                          opacity: [0, 0.5, 0],
                          x: ['-100%', '100%'],
                          transition: {
                            duration: 1,
                            ease: "easeInOut"
                          }
                        }}
                      />
                      
                      {/* 粒子效果 */}
                      <motion.span
                        className="absolute -inset-4 pointer-events-none"
                        whileHover={{
                          opacity: 1,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {[...Array(8)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="absolute w-1 h-1 bg-rose-500/50 rounded-full"
                            initial={{ opacity: 0, scale: 0 }}
                            whileHover={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              x: Math.cos(i * Math.PI / 4) * 20,
                              y: Math.sin(i * Math.PI / 4) * 20,
                              transition: {
                                duration: 0.8,
                                delay: i * 0.05,
                                repeat: Infinity
                              }
                            }}
                          />
                        ))}
                      </motion.span>
                      Dee Chen
                    </motion.span>
                  </motion.div>
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 社交媒體 Dock - 在所有設備上顯示 */}
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
          <motion.button 
            onClick={() => setIsEmailModalOpen(true)}
            className="flex h-full w-full items-center justify-center text-black hover:text-[#EA4335] transition-colors duration-200"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </motion.button>
        </DockIcon>

        {/* 更多選項 */}
        <DockIcon>
          <motion.button 
            onClick={() => setIsSocialModalOpen(true)}
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

      {/* 社群媒體彈出視窗 */}
      <SocialModal 
        isOpen={isSocialModalOpen} 
        onClose={() => setIsSocialModalOpen(false)} 
      />

      {/* 側邊單 */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Email Modal */}
      <EmailModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        email="h09171209@gmail.com"
      />

      {/* ContactModal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* AboutModal */}
      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* PortfolioModal */}
      <PortfolioModal 
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
      />
    </div>
  )
} 