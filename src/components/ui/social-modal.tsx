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
            drag
            dragMomentum={false}
            dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute left-[8%] top-[4%] -translate-x-1/2 -translate-y-1/3 z-50
                     w-[300px] md:w-[525px] bg-white/80 backdrop-blur-md rounded-3xl shadow-xl
                     cursor-move"
          >
            {/* 頂部拖動區域 */}
            <div className="absolute top-0 left-0 right-0 h-12 cursor-move" />

            {/* 關閉按鈕 */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={24} />
            </button>

            {/* 標題 */}
            <div className="p-6 pb-0">
              <h2 className="text-xl font-medium text-rose-500">社群媒體連結</h2>
            </div>

            {/* 社群媒體列表 */}
            <div className="grid grid-cols-4 gap-4 p-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 rounded-xl
                           hover:bg-white/50 transition-colors duration-200"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-xs text-gray-600">{link.name}</span>
                </a>
              ))}
            </div>

            {/* 底部按鈕 */}
            <div className="flex gap-2 p-4 border-t border-gray-200">
              <button
                className="flex items-center justify-center gap-2 w-1/2 py-2 px-4
                         rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <IoLinkOutline />
                複製連結
              </button>
              <button
                className="flex items-center justify-center gap-2 w-1/2 py-2 px-4
                         rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <IoShareSocialOutline />
                分享
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 