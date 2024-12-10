"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { FiHome, FiBox, FiShoppingBag, FiUser, FiMail } from "react-icons/fi";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { useState } from 'react';
import { ContactModal } from './contact-modal';
import { AboutModal } from './about-modal';
import { PortfolioModal } from './portfolio-modal';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const socialLinks = [
  { 
    icon: <FaInstagram className="text-2xl" />, 
    href: "https://www.instagram.com/deedeeboy_xoxo",
    color: "hover:text-[#E4405F]"
  },
  { 
    icon: <FaYoutube className="text-2xl" />, 
    href: "https://www.youtube.com/@DanDee0812",
    color: "hover:text-[#FF0000]"
  },
  { 
    icon: <FaFacebookF className="text-2xl" />, 
    href: "https://www.facebook.com/dee.chen3",
    color: "hover:text-[#1877f2]"
  }
];

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const menuItems = [
    { icon: <FiHome />, label: "Home", href: "/" },
    { 
      icon: <FiBox />, 
      label: "Portfolio", 
      onClick: () => setIsPortfolioModalOpen(true)
    },
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
              className="fixed right-0 top-0 h-full w-[240px] bg-white/80 backdrop-blur-md z-50
                       shadow-2xl flex flex-col"
            >
              {/* Logo */}
              <div className="p-6 pt-16">
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
              <nav className="flex-1 px-3">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl
                                   hover:bg-gray-100/50 transition-all duration-300 group"
                        >
                          <span className="text-xl group-hover:text-rose-500 transition-colors duration-200">
                            {item.icon}
                          </span>
                          <span className="font-['Montserrat'] font-medium text-base">
                            {item.label}
                          </span>
                        </a>
                      ) : (
                        <button
                          onClick={item.onClick}
                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl
                                   hover:bg-gray-100/50 transition-all duration-300 group"
                        >
                          <span className="text-xl group-hover:text-rose-500 transition-colors duration-200">
                            {item.icon}
                          </span>
                          <span className="font-['Montserrat'] font-medium text-base">
                            {item.label}
                          </span>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* 底部社交連結 */}
              <div className="p-4 border-t border-gray-200/50">
                <div className="flex gap-6 justify-center">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 text-gray-600 ${link.color} transition-all duration-300`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      <PortfolioModal 
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
      />
    </>
  );
} 