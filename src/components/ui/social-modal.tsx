"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { SiLine, SiWechat } from 'react-icons/si';
import { IoStorefrontOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { IoLinkOutline, IoShareSocialOutline } from "react-icons/io5";

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SocialModal({ isOpen, onClose }: SocialModalProps) {
  const socialLinks = [
    { icon: <FaFacebookF className="text-[#1877f2]" />, name: 'Facebook', href: 'https://www.facebook.com/dee.chen3' },
    { icon: <FaInstagram className="text-[#E4405F]" />, name: 'Instagram', href: 'https://www.instagram.com/deedeeboy_xoxo' },
    { icon: <FaYoutube className="text-[#FF0000]" />, name: 'YouTube', href: 'https://www.youtube.com/@DanDee0812' },
    { icon: <FaTiktok />, name: 'TikTok', href: '#' },
    { icon: <SiLine className="text-[#00B900]" />, name: 'Line', href: 'https://line.me/ti/p/KLkLx4ETSt' },
    { icon: <FaWhatsapp className="text-[#25D366]" />, name: 'WhatsApp', href: 'https://wa.me/886970737011' },
    { icon: <IoStorefrontOutline className="text-purple-600" />, name: 'Store', href: '#' },
    { icon: <SiWechat className="text-[#07C160]" />, name: 'WeChat', href: "weixin://dl/chat?DEE0917" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          
          {/* 社群媒體視窗 */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 
                     w-full md:w-[500px] h-[80vh] md:h-[600px]
                     bg-white rounded-t-[32px] md:rounded-[32px] overflow-hidden
                     shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)]
                     md:shadow-[0_0_40px_-15px_rgba(0,0,0,0.2)]"
          >
            {/* 頂部把手和標題區域 */}
            <div className="relative h-14 flex items-center justify-center border-b border-gray-100">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 
                            bg-gray-300/50 rounded-full" />
              <motion.h2 
                className="text-lg font-bold bg-gradient-to-r from-rose-500 to-indigo-600 
                         text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                社群媒體
              </motion.h2>
              <button
                onClick={onClose}
                className="absolute right-4 text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            {/* 社群媒體列表 */}
            <div className="overflow-y-auto h-[calc(100%-56px)]">
              <div className="grid grid-cols-4 gap-4 p-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-xl
                             hover:bg-gray-50 transition-colors duration-200
                             relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* 懸浮光環效果 */}
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-rose-500/0 to-indigo-500/0 
                               rounded-xl opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          "radial-gradient(circle, rgba(244,63,94,0.1) 0%, rgba(0,0,0,0) 70%)",
                          "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(0,0,0,0) 70%)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                    
                    {/* 圖標容器 */}
                    <motion.span 
                      className="text-2xl relative z-10"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {link.icon}
                    </motion.span>
                    
                    {/* 懸浮粒子效果 */}
                    <motion.div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="absolute w-1 h-1 bg-current rounded-full opacity-0"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 0.5, 0],
                            scale: [0.5, 1.5, 0.5],
                            x: Math.cos(i * Math.PI / 2) * 15,
                            y: Math.sin(i * Math.PI / 2) * 15,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            repeatDelay: 1
                          }}
                        />
                      ))}
                    </motion.div>

                    <span className="text-xs text-gray-600 relative z-10">{link.name}</span>
                  </motion.a>
                ))}
              </div>

              {/* 底部按鈕添加波紋效果 */}
              <div className="flex gap-2 p-4 border-t border-gray-100">
                <motion.button
                  className="flex items-center justify-center gap-2 w-1/2 py-2 px-4
                           rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors
                           relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-indigo-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <IoLinkOutline className="relative z-10" />
                  <span className="relative z-10">複製連結</span>
                </motion.button>
                <motion.button
                  className="flex items-center justify-center gap-2 w-1/2 py-2 px-4
                           rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors
                           relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-indigo-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <IoShareSocialOutline className="relative z-10" />
                  <span className="relative z-10">分享</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 