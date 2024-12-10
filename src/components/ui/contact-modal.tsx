"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { 
  FaPhoneAlt, FaEnvelope, FaFacebookMessenger, 
  FaLine, FaWhatsapp, FaTelegram, FaInstagram, FaYoutube, FaFacebookF 
} from "react-icons/fa";
import { IoLocationOutline, IoCopyOutline } from "react-icons/io5";
import { useState } from 'react';
import { EmailModal } from './email-modal';
import { SiWechat } from "react-icons/si";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const contactMethods = [
    {
      icon: <FaPhoneAlt className="text-green-500" />,
      label: "Phone",
      value: "+886970737011",
      action: "複製電話號碼",
      href: "#",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText("+886970737011");
      }
    },
    {
      icon: <FaEnvelope className="text-rose-500" />,
      label: "Email",
      value: "h09171209@gmail.com",
      action: "發送郵件",
      href: "#",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEmailModalOpen(true);
      }
    },
    {
      icon: <FaFacebookMessenger className="text-[#1877f2]" />,
      label: "Messenger",
      value: "Dee Chen",
      action: "開啟對話",
      href: "https://m.me/dee.chen3"
    },
    {
      icon: <FaLine className="text-[#00B900]" />,
      label: "Line",
      value: "ID: deedeeboy",
      action: "加入好友",
      href: "https://line.me/ti/p/KLkLx4ETSt"
    },
    {
      icon: <FaWhatsapp className="text-[#25D366]" />,
      label: "WhatsApp",
      value: "+886970737011",
      action: "傳送訊息",
      href: "https://wa.me/886970737011"
    },
    {
      icon: <FaTelegram className="text-[#0088cc]" />,
      label: "Telegram",
      value: "@deedeeboy",
      action: "傳送訊息",
      href: "https://t.me/+886970737011"
    },
    {
      icon: <SiWechat className="text-[#07C160]" />,
      label: "WeChat",
      value: "ID: DEE0917",
      action: "加入好友",
      href: "weixin://dl/chat?DEE0917"
    }
  ];

  const mainSocialLinks = [
    {
      icon: <FaInstagram className="text-2xl text-[#E4405F]" />,
      name: "Instagram",
      href: "https://www.instagram.com/deedeeboy_xoxo",
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
    },
    {
      icon: <FaYoutube className="text-2xl text-[#FF0000]" />,
      name: "YouTube",
      href: "https://www.youtube.com/@DanDee0812",
      color: "hover:bg-red-500"
    },
    {
      icon: <FaFacebookF className="text-2xl text-[#1877f2]" />,
      name: "Facebook",
      href: "https://www.facebook.com/dee.chen3",
      color: "hover:bg-blue-500"
    }
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            
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
              <div className="relative h-14 flex items-center justify-center border-b border-gray-100">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 
                              bg-gray-300/50 rounded-full" />
                <motion.h2 
                  className="text-lg font-bold bg-gradient-to-r from-rose-500 to-indigo-600 
                           text-transparent bg-clip-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  聯絡我
                </motion.h2>
                <button
                  onClick={onClose}
                  className="absolute right-4 text-gray-500 hover:text-gray-700"
                >
                  <IoMdClose size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className="space-y-3">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <a
                        href={method.href}
                        onClick={method.onClick}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center justify-between p-4 rounded-2xl
                                 bg-white/50 hover:bg-white/80 transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-100/80 flex items-center justify-center">
                            {method.icon}
                          </div>
                          <div>
                            <div className="font-medium">{method.label}</div>
                            <div className="text-sm text-gray-500">{method.value}</div>
                          </div>
                        </div>
                        <motion.span
                          className="text-sm text-gray-400 group-hover:text-gray-600 flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          {method.label === "Phone" && <IoCopyOutline />}
                          {method.action} {method.label !== "Phone" && "→"}
                        </motion.span>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex justify-center gap-6">
                  {mainSocialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-full flex items-center justify-center
                                bg-gray-50 ${link.color} group transition-all duration-300
                                hover:shadow-lg hover:shadow-gray-200/50`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="relative"
                        whileHover={{
                          rotate: [0, -10, 10, -10, 10, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <div className="group-hover:text-white transition-colors duration-300">
                          {link.icon}
                        </div>

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
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-3 border-t border-gray-200/50">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <IoLocationOutline />
                  <span>Taiwan</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <EmailModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        email="h09171209@gmail.com"
      />
    </>
  );
} 