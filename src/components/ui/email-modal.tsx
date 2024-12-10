"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { IoMailOutline, IoSendSharp } from "react-icons/io5";
import { useState } from "react";
import emailjs from '@emailjs/browser';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function EmailModal({ isOpen, onClose, email }: EmailModalProps) {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    senderEmail: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表單驗證
    if (!formData.subject.trim()) {
      alert('請輸入郵件主旨');
      return;
    }
    if (!formData.message.trim()) {
      alert('請輸入郵件內容');
      return;
    }
    if (!formData.senderEmail.trim()) {
      alert('請輸入您的郵件地址');
      return;
    }
    // 簡單的郵件格式驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.senderEmail)) {
      alert('請輸入有效的郵件地址');
      return;
    }

    setIsSending(true);
    
    try {
      const templateParams = {
        to_name: "Dee Chen",
        from_name: "網站訪客",
        to_email: email,
        from_email: formData.senderEmail,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.senderEmail,
      };

      // 初始化 EmailJS
      emailjs.init("z8cng3rd7lecv8pYV");

      const result = await emailjs.send(
        'service_j1wx1dn',
        'template_gov91ac',
        templateParams
      );

      console.log('Email sent successfully:', result);
      setSendStatus('success');
      
      setTimeout(() => {
        setFormData({ subject: "", message: "", senderEmail: "" });
        setSendStatus('idle');
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Email sending failed:', {
        error,
        config: {
          serviceId: 'service_j1wx1dn',
          templateId: 'template_gov91ac',
          publicKey: 'z8cng3rd7lecv8pYV'
        },
        templateParams: {
          to_name: "Dee Chen",
          from_name: "網站訪客",
          to_email: email,
          subject: formData.subject,
          message_length: formData.message.length
        }
      });
      setSendStatus('error');
    } finally {
      setIsSending(false);
    }
  };

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

          {/* 郵件表單 */}
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
                發送郵件
              </motion.h2>
              <button
                onClick={onClose}
                className="absolute right-4 text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              {/* 關閉按鈕 */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100/50 
                         transition-colors duration-200"
              >
                <IoMdClose size={24} className="text-gray-600" />
              </button>

              {/* 標題 */}
              <div className="p-6 pb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                  <IoMailOutline size={24} className="text-rose-500" />
                </div>
                <div>
                  <h2 className="text-xl font-['Montserrat'] font-bold">發送郵件</h2>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>

              {/* 表單內容 */}
              <div className="px-6 pb-6 space-y-4">
                {/* 發送者郵件地址 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">您的郵件地址</label>
                  <input
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, senderEmail: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white/50 border border-gray-200
                             focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500
                             transition-all duration-200"
                    placeholder="請輸入您的郵件地址"
                  />
                </div>

                {/* 主旨 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">主旨</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white/50 border border-gray-200
                             focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500
                             transition-all duration-200"
                    placeholder="請輸入郵件主旨"
                  />
                </div>

                {/* 內容 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">內容</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-2 rounded-xl bg-white/50 border border-gray-200
                             focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500
                             transition-all duration-200 resize-none"
                    placeholder="請輸入郵件內容"
                  />
                </div>
              </div>

              {/* 發送按鈕 */}
              <div className="px-6 pb-6">
                <motion.button
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-3 rounded-xl font-medium
                    flex items-center justify-center gap-2
                    ${isSending ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}
                    text-white transition-colors duration-200`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      發送中...
                    </>
                  ) : (
                    <>
                      <IoSendSharp />
                      發送郵件
                    </>
                  )}
                </motion.button>
              </div>

              {/* 狀態提示 */}
              <AnimatePresence>
                {sendStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full
                      ${sendStatus === 'success' ? 'bg-green-500' : 'bg-red-500'}
                      text-white text-sm`}
                  >
                    {sendStatus === 'success' ? '郵件發送成功！' : '發送失敗，請稍後再試'}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 