"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTiktok, FaEnvelope } from 'react-icons/fa';
import { SiLine, SiWechat } from 'react-icons/si';
import { IoStorefrontOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { IoLinkOutline, IoShareSocialOutline } from "react-icons/io5";
import { useState } from 'react';

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SocialModal({ isOpen, onClose }: SocialModalProps) {
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

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

  // 复制链接功能
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // 分享功能
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Dee Chen 個人網站',
          text: '歡迎來到我的個人網站！',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
        setShowShareMenu(true);  // 如果原生分享失败，显示自定义分享菜单
      }
    } else {
      setShowShareMenu(true);  // 如果不支持原生分享，显示自定义分享菜单
    }
  };

  // 自定义分享选项
  const shareOptions = [
    {
      name: 'Facebook',
      icon: <FaFacebookF className="text-[#1877f2]" />,
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
      }
    },
    {
      name: 'Line',
      icon: <SiLine className="text-[#00B900]" />,
      action: () => {
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, '_blank');
      }
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-[#25D366]" />,
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank');
      }
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="text-gray-600" />,
      action: () => {
        window.location.href = `mailto:?subject=Check this out&body=${encodeURIComponent(window.location.href)}`;
      }
    }
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
                             relative group overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* 背景动画 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0"
                      initial={false}
                      animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* 图标容器 */}
                    <motion.div
                      className="relative z-10"
                      whileHover={{
                        scale: 1.2,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      <span className="text-2xl relative z-10">{link.icon}</span>
                      
                      {/* 光环效果 */}
                      <motion.div
                        className="absolute -inset-2 bg-current rounded-full opacity-0"
                        initial={false}
                        whileHover={{
                          opacity: [0, 0.1, 0],
                          scale: [1, 1.5, 1],
                          transition: {
                            duration: 1,
                            repeat: Infinity
                          }
                        }}
                      />
                    </motion.div>

                    {/* 文字 */}
                    <motion.span 
                      className="text-xs text-gray-600 relative z-10"
                      whileHover={{
                        y: 2,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      {link.name}
                    </motion.span>
                  </motion.a>
                ))}
              </div>

              {/* 底部按钮 */}
              <div className="flex gap-2 p-4 border-t border-gray-100">
                <motion.button
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gray-50 
                           relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* 按钮背景动画 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-indigo-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <IoLinkOutline />
                    複製連結
                  </span>
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gray-50 
                           relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* 按钮背景动画 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-indigo-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <IoShareSocialOutline />
                    分享
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 复制成功提示 */}
          <AnimatePresence>
            {showCopyToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-20 left-1/2 -translate-x-1/2 
                         bg-black/80 text-white px-4 py-2 rounded-full
                         text-sm shadow-lg"
              >
                已複製連結！
              </motion.div>
            )}
          </AnimatePresence>

          {/* 自定义分享菜单 */}
          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center"
                onClick={() => setShowShareMenu(false)}
              >
                <motion.div
                  className="bg-white rounded-2xl p-4 w-[300px] space-y-2"
                  onClick={e => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold mb-3">分享到</h3>
                  {shareOptions.map((option, index) => (
                    <motion.button
                      key={option.name}
                      className="w-full flex items-center gap-3 p-3 rounded-xl
                               hover:bg-gray-50 transition-colors"
                      onClick={option.action}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xl">{option.icon}</span>
                      <span>{option.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
} 