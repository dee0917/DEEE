"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { 
  FaPhoneAlt, FaEnvelope, FaFacebookMessenger, 
  FaLine, FaWhatsapp, FaTelegram 
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
      href: "#"
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
      href: "#"
    },
    {
      icon: <SiWechat className="text-[#07C160]" />,
      label: "WeChat",
      value: "ID: deedeeboy",
      action: "加入好友",
      href: "#"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed left-[35%] top-[13%] -translate-x-1/2 -translate-y-1/2 z-50
                       w-[500px] max-h-[600px] bg-white/80 backdrop-blur-md rounded-3xl shadow-xl
                       flex flex-col"
            >
              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100/50 
                         transition-colors duration-200"
              >
                <IoMdClose size={24} className="text-gray-600" />
              </button>

              {/* 標題 - 固定在頂部 */}
              <div className="p-6 pb-0">
                <h2 className="text-2xl font-['Montserrat'] font-bold">聯絡我</h2>
                <p className="text-gray-500 mt-1">選擇您喜歡的聯絡方式</p>
              </div>

              {/* 聯絡方式列表 - 可滾動區域 */}
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

              {/* 底部資訊 - 固定在底部 */}
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