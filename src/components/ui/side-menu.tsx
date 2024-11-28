"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { FiHome, FiBox, FiShoppingBag, FiUser, FiMail, FiGithub, FiInstagram } from "react-icons/fi";
import { useState } from 'react';
import { ContactModal } from './contact-modal';
import { AboutModal } from './about-modal';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const socialLinks = [
  { icon: <FiGithub />, href: "#" },
  { icon: <FiInstagram />, href: "https://www.instagram.com/deedeeboy_xoxo" },
];

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const menuItems = [
    { icon: <FiHome />, label: "Home", href: "/" },
    { icon: <FiBox />, label: "Product", href: "/product" },
    { icon: <FiShoppingBag />, label: "Store", href: "https://dandeetw.com" },
    { 
      icon: <FiUser />, 
      label: "About Me", 
      onClick: () => setIsAboutModalOpen(true) 
    },
    { 
      icon: <FiMail />, 
      label: "Contact", 
      onClick: () => setIsContactModalOpen(true) 
    },
  ];

  return (
    <>
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

            {/* 側邊選單 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[300px] bg-white/80 backdrop-blur-md z-50
                       shadow-2xl flex flex-col"
            >
              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100/50 
                         transition-colors duration-200"
              >
                <IoMdClose size={24} className="text-gray-600" />
              </button>

              {/* Logo */}
              <div className="p-8 pt-20">
                <motion.h2 
                  className="text-2xl font-['Montserrat'] font-black tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  SkMswDee.
                </motion.h2>
              </div>

              {/* 選單項目 */}
              <nav className="flex-1 px-4">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    item.href ? (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl
                                 hover:bg-gray-100/50 transition-colors duration-200 group"
                      >
                        <span className="text-xl group-hover:text-rose-500 transition-colors duration-200">
                          {item.icon}
                        </span>
                        <span className="font-['Montserrat'] font-medium">
                          {item.label}
                        </span>
                      </motion.a>
                    ) : (
                      <motion.button
                        key={item.label}
                        onClick={item.onClick}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl
                                 hover:bg-gray-100/50 transition-colors duration-200 group"
                      >
                        <span className="text-xl group-hover:text-rose-500 transition-colors duration-200">
                          {item.icon}
                        </span>
                        <span className="font-['Montserrat'] font-medium">
                          {item.label}
                        </span>
                      </motion.button>
                    )
                  ))}
                </div>
              </nav>

              {/* 底部社交連結 */}
              <motion.div 
                className="p-8 border-t border-gray-200/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex gap-4 justify-center">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      <span className="text-xl">{link.icon}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 聯絡資訊彈窗 */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          onClose();
        }}
      />

      {/* 添加 About Modal */}
      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={() => {
          setIsAboutModalOpen(false);
          onClose();
        }}
      />
    </>
  );
} 